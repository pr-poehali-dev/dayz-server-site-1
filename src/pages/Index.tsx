import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── DATA ───────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "cabinet", label: "Кабинет" },
  { id: "topup", label: "Пополнение" },
  { id: "legal", label: "Соглашения" },
  { id: "support", label: "Поддержка" },
];

const CATEGORIES = ["Все", "Привилегии", "Оружие", "Снаряжение", "Транспорт", "Ресурсы", "Услуги"];

const PRODUCTS = [
  { id: 1, name: "VIP Статус", category: "Привилегии", price: 299, badge: "Хит", desc: "Доступ к VIP-зонам, цветной ник, приоритетный вход", icon: "Crown" },
  { id: 2, name: "MVP Статус", category: "Привилегии", price: 599, badge: "Топ", desc: "Все преимущества VIP + кастомные скины, двойной опыт", icon: "Star" },
  { id: 3, name: "AK-74 с обвесами", category: "Оружие", price: 199, badge: null, desc: "Полностью укомплектованный автомат с глушителем и прицелом", icon: "Crosshair" },
  { id: 4, name: "SVD Снайперская", category: "Оружие", price: 349, badge: "Редкое", desc: "Снайперская винтовка с ночным прицелом и 60 патронами", icon: "Crosshair" },
  { id: 5, name: "Бронежилет TTSKO", category: "Снаряжение", price: 149, badge: null, desc: "Тактический бронежилет военного образца, 8 слотов", icon: "Shield" },
  { id: 6, name: "Рюкзак Mountain", category: "Снаряжение", price: 89, badge: null, desc: "Большой туристический рюкзак на 63 слота", icon: "Package" },
  { id: 7, name: "Медицинский набор", category: "Ресурсы", price: 59, badge: null, desc: "x5 бинтов, x3 морфина, x2 адреналина, дефибриллятор", icon: "Heart" },
  { id: 8, name: "Набор выживальщика", category: "Ресурсы", price: 129, badge: "Выгодно", desc: "Еда, вода, спальник, зажигалка — старт нового персонажа", icon: "Backpack" },
  { id: 9, name: "Военный УАЗ", category: "Транспорт", price: 449, badge: "Редкое", desc: "Полностью отремонтированный УАЗ с запасными деталями", icon: "Truck" },
  { id: 10, name: "Мотоцикл CR527", category: "Транспорт", price: 299, badge: null, desc: "Скоростной мотоцикл с полным баком топлива", icon: "Zap" },
  { id: 11, name: "Смена никнейма", category: "Услуги", price: 49, badge: null, desc: "Одноразовая смена игрового имени на сервере", icon: "Edit" },
  { id: 12, name: "Набор строителя", category: "Снаряжение", price: 179, badge: null, desc: "Инструменты и материалы для постройки базы", icon: "Hammer" },
  { id: 13, name: "ELITE Статус", category: "Привилегии", price: 999, badge: "Лимит", desc: "Максимальный статус. Уникальный ник-цвет, личная зона", icon: "Award" },
  { id: 14, name: "Glock + глушитель", category: "Оружие", price: 99, badge: null, desc: "Компактный пистолет с глушителем и 4 магазинами", icon: "Crosshair" },
  { id: 15, name: "Тепловизор", category: "Снаряжение", price: 259, badge: "Редкое", desc: "Ночной тепловизор военного класса", icon: "Eye" },
  { id: 16, name: "Набор химика", category: "Ресурсы", price: 199, badge: null, desc: "Противогаз, костюм химзащиты, 3 фильтра", icon: "FlaskConical" },
  { id: 17, name: "Снегоход Ямаха", category: "Транспорт", price: 379, badge: null, desc: "Надежный снегоход для зимних локаций", icon: "Truck" },
  { id: 18, name: "М4А1 Тактическая", category: "Оружие", price: 289, badge: "Хит", desc: "Штурмовая винтовка с коллиматором и рукоятью", icon: "Crosshair" },
  { id: 19, name: "Разблокировка зоны", category: "Услуги", price: 399, badge: null, desc: "Доступ к закрытой военной зоне на 30 дней", icon: "Lock" },
  { id: 20, name: "Антирейд 24ч", category: "Услуги", price: 149, badge: "Новинка", desc: "Временная защита базы от рейдов на 24 часа", icon: "Shield" },
  { id: 21, name: "Дробовик Winchester", category: "Оружие", price: 139, badge: null, desc: "Охотничий дробовик с 60 патронами 12 калибра", icon: "Crosshair" },
  { id: 22, name: "Бинокль военный", category: "Снаряжение", price: 79, badge: null, desc: "Армейский бинокль 10x42 с дальностью 500м", icon: "Search" },
  { id: 23, name: "Вертолёт UH-1", category: "Транспорт", price: 1499, badge: "Редкое", desc: "Военный вертолёт — самый редкий транспорт на сервере", icon: "Plane" },
  { id: 24, name: "Аптечка военная", category: "Ресурсы", price: 99, badge: null, desc: "x10 бинтов, x5 морфина, x3 кровь, антибиотики", icon: "Heart" },
  { id: 25, name: "Лодка Zodiac", category: "Транспорт", price: 249, badge: null, desc: "Моторная лодка для морских маршрутов", icon: "Anchor" },
  { id: 26, name: "Набор рейдера", category: "Ресурсы", price: 349, badge: "Выгодно", desc: "Взрывчатка, инструменты для взлома, дымовые гранаты", icon: "Bomb" },
  { id: 27, name: "Перезапуск персонажа", category: "Услуги", price: 29, badge: null, desc: "Сброс персонажа в безопасную точку с базовым лутом", icon: "RotateCcw" },
  { id: 28, name: "M249 Пулемёт", category: "Оружие", price: 599, badge: "Лимит", desc: "Ручной пулемёт с 200 патронами, высокая скорострельность", icon: "Crosshair" },
  { id: 29, name: "База под ключ", category: "Услуги", price: 799, badge: "Новинка", desc: "Готовая укреплённая база в выбранной локации", icon: "Home" },
  { id: 30, name: "Ящик с лутом", category: "Ресурсы", price: 199, badge: "Выгодно", desc: "Случайный набор из 15+ предметов — оружие, еда, броня", icon: "Package" },
];

const PAYMENT_METHODS = [
  { name: "Банковская карта", icon: "CreditCard", desc: "Visa, MasterCard, Мир" },
  { name: "СБП", icon: "Smartphone", desc: "Система быстрых платежей" },
  { name: "ЮMoney", icon: "Wallet", desc: "Электронный кошелёк" },
  { name: "QIWI", icon: "Wallet", desc: "QIWI Кошелёк" },
  { name: "WebMoney", icon: "Globe", desc: "WM кошелёк" },
  { name: "Криптовалюта", icon: "Bitcoin", desc: "BTC, ETH, USDT" },
];

const PURCHASE_HISTORY = [
  { id: 1, item: "VIP Статус", date: "29.03.2026", price: 299, status: "Выдан" },
  { id: 2, item: "AK-74 с обвесами", date: "15.03.2026", price: 199, status: "Выдан" },
  { id: 3, item: "Набор выживальщика", date: "01.03.2026", price: 129, status: "Выдан" },
];

const BADGE_COLORS: Record<string, string> = {
  "Хит": "bg-amber-800/60 text-amber-300 border-amber-700",
  "Топ": "bg-yellow-800/60 text-yellow-300 border-yellow-700",
  "Редкое": "bg-purple-900/60 text-purple-300 border-purple-700",
  "Выгодно": "bg-green-900/60 text-green-300 border-green-700",
  "Лимит": "bg-red-900/60 text-red-300 border-red-700",
  "Новинка": "bg-blue-900/60 text-blue-300 border-blue-700",
};

const HERO_IMAGE = "https://cdn.poehali.dev/projects/3cb6e349-c73c-4755-a2ab-0da11e75c9c7/files/a2636afa-6b2b-4ee4-addf-057f74f7c2e3.jpg";

// ─── NAVBAR ─────────────────────────────────────────────────────
function Navbar({ active, setActive }: { active: string; setActive: (id: string) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={() => setActive("home")} className="flex items-center gap-3 group">
          <div className="w-8 h-8 border border-primary/60 flex items-center justify-center animate-pulse-glow">
            <Icon name="Skull" size={16} className="text-primary" />
          </div>
          <span className="font-oswald text-lg uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">
            Outpost<span className="text-primary">.</span>DayZ
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`nav-link ${active === item.id ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActive("cabinet")}
            className="btn-primary flex items-center gap-2 text-xs"
          >
            <Icon name="LogIn" size={14} />
            Войти через Steam
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/98">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => { setActive(item.id); setMobileOpen(false); }}
              className={`block w-full text-left px-4 py-3 nav-link border-b border-border/50 ${active === item.id ? "active bg-muted" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── HOME ────────────────────────────────────────────────────────
function HomePage({ setActive }: { setActive: (id: string) => void }) {
  return (
    <div className="pt-16">
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute inset-0 scanline" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <h1 className="font-oswald text-5xl md:text-7xl uppercase leading-none mb-4 animate-fade-in delay-100">
              Выживи<br />
              <span className="text-primary glow-text">или умри</span>
            </h1>

            <p className="font-roboto text-muted-foreground text-lg mb-8 leading-relaxed animate-fade-in delay-200">
              Официальный сайт проекта Outpost.<br />
              Снаряжение, привилегии и транспорт — для тех, кто хочет выжить.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in delay-300">
              <button onClick={() => setActive("catalog")} className="btn-primary text-sm">
                Открыть каталог
              </button>
              <button onClick={() => setActive("cabinet")} className="btn-secondary text-sm">
                Войти через Steam
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-16 animate-fade-in delay-400 max-w-xs">
              {[
                { label: "Товаров в магазине", value: "30+" },
              ].map(stat => (
                <div key={stat.label} className="stat-card">
                  <div className="font-oswald text-2xl text-primary mb-1">{stat.value}</div>
                  <div className="font-roboto text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4">
        <h2 className="section-title mb-12 text-center">Почему <span>выбирают нас</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "Zap", title: "Мгновенная выдача", desc: "Товары выдаются автоматически сразу после оплаты без ожидания" },
            { icon: "Shield", title: "Безопасная оплата", desc: "Все платежи защищены. Возврат средств при технических сбоях" },
            { icon: "Users", title: "Сообщество", desc: "Присоединяйся к Discord и Telegram — активное комьюнити игроков" },
          ].map((f, i) => (
            <div key={f.title} className={`card-product p-6 animate-fade-in delay-${(i + 1) * 100}`}>
              <div className="w-10 h-10 border border-primary/40 flex items-center justify-center mb-4">
                <Icon name={f.icon} size={20} className="text-primary" />
              </div>
              <h3 className="font-oswald text-lg uppercase tracking-wide mb-2">{f.title}</h3>
              <p className="font-roboto text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="section-title mb-4">Готов к <span>выживанию?</span></h2>
          <p className="font-roboto text-muted-foreground mb-8">Подключись к серверу и получи преимущество уже сегодня</p>
          <button onClick={() => setActive("catalog")} className="btn-primary">
            Перейти в каталог
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── CATALOG ─────────────────────────────────────────────────────
function CatalogPage({ setActive }: { setActive: (id: string) => void }) {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [search, setSearch] = useState("");

  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeCategory === "Все" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4">
      <div className="mb-10">
        <h1 className="section-title mb-2">Каталог <span>товаров</span></h1>
        <p className="font-roboto text-muted-foreground text-sm">Снаряжение, оружие, привилегии и услуги для DayZ сервера</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-card border border-border pl-10 pr-4 py-3 font-roboto text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-oswald text-xs uppercase tracking-wider px-4 py-3 border transition-colors ${
                activeCategory === cat
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((product) => (
          <div key={product.id} className="card-product animate-fade-in">
            <div className="p-4 pb-0 flex justify-between items-start">
              <div className="w-10 h-10 bg-muted border border-border flex items-center justify-center">
                <Icon name={product.icon} size={18} className="text-primary" fallback="Package" />
              </div>
              {product.badge && (
                <span className={`tag-badge border ${BADGE_COLORS[product.badge] || "bg-muted text-muted-foreground border-border"}`}>
                  {product.badge}
                </span>
              )}
            </div>

            <div className="p-4">
              <div className="font-oswald text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.category}</div>
              <h3 className="font-oswald text-base uppercase tracking-wide mb-2 text-foreground">{product.name}</h3>
              <p className="font-roboto text-xs text-muted-foreground leading-relaxed mb-4">{product.desc}</p>

              <div className="flex items-center justify-between">
                <span className="font-oswald text-xl text-primary">{product.price} <span className="text-sm">₽</span></span>
                <button onClick={() => setActive("cabinet")} className="btn-primary text-xs px-4 py-2">
                  Купить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <Icon name="SearchX" size={40} className="text-muted-foreground mx-auto mb-4" />
          <p className="font-oswald text-muted-foreground uppercase tracking-wider">Ничего не найдено</p>
        </div>
      )}
    </div>
  );
}

// ─── CABINET ─────────────────────────────────────────────────────
function CabinetPage({ setActive }: { setActive: (id: string) => void }) {
  const [tab, setTab] = useState<"profile" | "history">("profile");
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <div className="pt-24 pb-20 max-w-2xl mx-auto px-4 text-center">
        <div className="card-product p-12">
          <div className="w-16 h-16 border border-border flex items-center justify-center mx-auto mb-6">
            <Icon name="User" size={32} className="text-muted-foreground" />
          </div>
          <h1 className="section-title mb-4">Личный <span>кабинет</span></h1>
          <p className="font-roboto text-muted-foreground mb-8 leading-relaxed">
            Войдите через Steam для доступа к личному кабинету,<br />истории покупок и управлению балансом.
          </p>
          <button className="btn-primary mx-auto flex items-center gap-3 justify-center">
            <Icon name="LogIn" size={16} />
            Войти через Steam
          </button>
          <p className="font-roboto text-xs text-muted-foreground mt-6">
            Нажимая кнопку, вы соглашаетесь с{" "}
            <button onClick={() => setActive("legal")} className="text-primary hover:underline">
              пользовательским соглашением
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 max-w-5xl mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 space-y-4">
          <div className="card-product p-6 text-center">
            <div className="w-16 h-16 border border-primary/40 flex items-center justify-center mx-auto mb-3">
              <Icon name="User" size={28} className="text-primary" />
            </div>
            <div className="font-oswald text-lg uppercase">SurvivorXX</div>
            <div className="font-roboto text-xs text-muted-foreground">Steam ID: 76561198...</div>
            <div className="mt-4 p-3 bg-muted border border-border">
              <div className="font-roboto text-xs text-muted-foreground mb-1">Баланс</div>
              <div className="font-oswald text-2xl text-primary">320 ₽</div>
            </div>
            <button onClick={() => setActive("topup")} className="btn-primary w-full mt-4 text-xs justify-center flex items-center gap-2">
              <Icon name="Plus" size={14} />
              Пополнить
            </button>
          </div>

          <div className="space-y-1">
            {[
              { id: "profile", icon: "User", label: "Профиль" },
              { id: "history", icon: "Clock", label: "История покупок" },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 font-oswald text-sm uppercase tracking-wide transition-colors border ${
                  tab === item.id
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          {tab === "profile" && (
            <div className="card-product p-6">
              <h2 className="font-oswald text-xl uppercase tracking-wider mb-6 border-b border-border pb-4">Профиль</h2>
              <div className="space-y-4">
                {[
                  { label: "Игровой ник", value: "SurvivorXX" },
                  { label: "Steam ID", value: "76561198XXXXXXXX" },
                  { label: "Дата регистрации", value: "15.01.2026" },
                  { label: "Статус на сервере", value: "VIP" },
                  { label: "Покупок всего", value: "3" },
                  { label: "Потрачено", value: "627 ₽" },
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="font-roboto text-sm text-muted-foreground">{row.label}</span>
                    <span className="font-oswald text-sm text-foreground">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "history" && (
            <div className="card-product p-6">
              <h2 className="font-oswald text-xl uppercase tracking-wider mb-6 border-b border-border pb-4">История покупок</h2>
              <div className="space-y-3">
                {PURCHASE_HISTORY.map(purchase => (
                  <div key={purchase.id} className="flex items-center justify-between p-4 bg-muted border border-border">
                    <div>
                      <div className="font-oswald text-sm uppercase tracking-wide">{purchase.item}</div>
                      <div className="font-roboto text-xs text-muted-foreground mt-1">{purchase.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-oswald text-base text-primary">{purchase.price} ₽</div>
                      <div className="font-roboto text-xs text-green-400 mt-1">{purchase.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── TOPUP ───────────────────────────────────────────────────────
function TopupPage() {
  const [amount, setAmount] = useState("300");
  const PRESETS = ["100", "300", "500", "1000", "2000", "5000"];

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4">
      <h1 className="section-title mb-2">Пополнение <span>баланса</span></h1>
      <p className="font-roboto text-muted-foreground text-sm mb-10">Выберите способ оплаты и сумму пополнения</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card-product p-6">
          <h2 className="font-oswald text-lg uppercase tracking-wider mb-6">Сумма пополнения</h2>

          <div className="grid grid-cols-3 gap-2 mb-6">
            {PRESETS.map(preset => (
              <button
                key={preset}
                onClick={() => setAmount(preset)}
                className={`font-oswald text-sm py-3 border transition-colors ${
                  amount === preset
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {preset} ₽
              </button>
            ))}
          </div>

          <div className="mb-4">
            <label className="font-roboto text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
              Или введите сумму
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                min="50"
                placeholder="Минимум 50 ₽"
                className="w-full bg-muted border border-border px-4 py-3 font-oswald text-lg text-foreground focus:outline-none focus:border-primary/50 pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-oswald text-muted-foreground">₽</span>
            </div>
          </div>

          <div className="p-4 bg-muted border border-border text-center">
            <div className="font-roboto text-xs text-muted-foreground mb-1">Будет зачислено на баланс</div>
            <div className="font-oswald text-3xl text-primary">{amount || "0"} ₽</div>
          </div>
        </div>

        <div className="card-product p-6">
          <h2 className="font-oswald text-lg uppercase tracking-wider mb-6">Способ оплаты</h2>
          <div className="space-y-3">
            {PAYMENT_METHODS.map(method => (
              <button
                key={method.name}
                className="w-full flex items-center gap-4 p-4 bg-muted border border-border hover:border-primary/40 transition-colors group"
              >
                <div className="w-10 h-10 border border-border group-hover:border-primary/40 flex items-center justify-center flex-shrink-0 transition-colors">
                  <Icon name={method.icon} size={18} className="text-muted-foreground group-hover:text-primary transition-colors" fallback="CreditCard" />
                </div>
                <div className="text-left">
                  <div className="font-oswald text-sm uppercase tracking-wide text-foreground">{method.name}</div>
                  <div className="font-roboto text-xs text-muted-foreground">{method.desc}</div>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground ml-auto" />
              </button>
            ))}
          </div>

          <p className="font-roboto text-xs text-muted-foreground mt-6 leading-relaxed">
            Все платежи защищены. Минимальная сумма — 50 ₽. Зачисление мгновенное.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── LEGAL ───────────────────────────────────────────────────────
function LegalPage() {
  const [tab, setTab] = useState<"terms" | "privacy">("terms");

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4">
      <h1 className="section-title mb-8">Правовые <span>документы</span></h1>

      <div className="flex gap-2 mb-8 flex-wrap">
        {[
          { id: "terms", label: "Пользовательское соглашение" },
          { id: "privacy", label: "Политика конфиденциальности" },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`font-oswald text-xs uppercase tracking-wider px-5 py-3 border transition-colors ${
              tab === t.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/40"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="card-product p-8">
        {tab === "terms" ? (
          <div className="space-y-6 font-roboto text-sm text-muted-foreground leading-relaxed">
            <div>
              <h2 className="font-oswald text-2xl uppercase text-foreground mb-1">Пользовательское соглашение</h2>
              <p className="font-roboto text-xs text-muted-foreground">Последнее обновление: 01.04.2026</p>
            </div>
            {[
              { title: "1. Общие положения", text: "Настоящее пользовательское соглашение регулирует отношения между администрацией игрового сервера DayZ Server (далее — Администрация) и пользователями сайта (далее — Пользователь). Используя сайт и услуги, вы подтверждаете своё согласие с настоящим соглашением." },
              { title: "2. Предмет соглашения", text: "Администрация предоставляет Пользователю доступ к игровому серверу DayZ и возможность приобретения внутриигровых товаров, привилегий и услуг. Все приобретённые товары являются цифровыми услугами и не имеют физического воплощения." },
              { title: "3. Регистрация и авторизация", text: "Для совершения покупок необходима авторизация через платформу Steam. Пользователь обязуется не передавать доступ к своей учётной записи третьим лицам. Администрация не несёт ответственности за последствия несанкционированного доступа." },
              { title: "4. Оплата и возврат", text: "Оплата производится через платёжные сервисы, представленные на сайте. После успешной оплаты товар выдаётся автоматически. Возврат средств возможен только в случае технической ошибки при выдаче товара." },
              { title: "5. Правила поведения", text: "Пользователь обязуется соблюдать правила сервера, не использовать сторонние программы (читы, боты). Нарушение правил может повлечь бан без возврата средств." },
              { title: "6. Ответственность", text: "Администрация не несёт ответственности за временную недоступность сервера в связи с техническими работами. Время плановых работ — не более 24 часов в месяц." },
            ].map(section => (
              <div key={section.title}>
                <h3 className="font-oswald text-base uppercase tracking-wide text-foreground mb-2">{section.title}</h3>
                <p>{section.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6 font-roboto text-sm text-muted-foreground leading-relaxed">
            <div>
              <h2 className="font-oswald text-2xl uppercase text-foreground mb-1">Политика конфиденциальности</h2>
              <p className="font-roboto text-xs text-muted-foreground">Последнее обновление: 01.04.2026</p>
            </div>
            {[
              { title: "1. Сбор данных", text: "При авторизации через Steam мы получаем: Steam ID, публичное имя профиля, URL аватара. Мы не получаем доступ к вашему паролю Steam, банковским данным или другой конфиденциальной информации." },
              { title: "2. Использование данных", text: "Собранные данные используются исключительно для: идентификации пользователя на сервере, начисления приобретённых товаров, ведения истории покупок, технической поддержки. Мы не продаём данные третьим лицам." },
              { title: "3. Платёжные данные", text: "Платёжные данные не хранятся на наших серверах. Все транзакции обрабатываются через сертифицированные платёжные сервисы. Мы получаем только информацию об успешности платежа." },
              { title: "4. Файлы Cookie", text: "Сайт использует cookie-файлы для поддержания сессии авторизации. Вы можете отключить cookie в настройках браузера, однако это может повлиять на работу сайта." },
              { title: "5. Хранение данных", text: "Данные хранятся на защищённых серверах с использованием шифрования. История покупок хранится бессрочно. При удалении аккаунта данные удаляются в течение 30 дней." },
              { title: "6. Контакты", text: "По вопросам обработки персональных данных обращайтесь через форму поддержки или в Discord. Ответим в течение 3 рабочих дней." },
            ].map(section => (
              <div key={section.title}>
                <h3 className="font-oswald text-base uppercase tracking-wide text-foreground mb-2">{section.title}</h3>
                <p>{section.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SUPPORT ─────────────────────────────────────────────────────
function SupportPage() {
  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4">
      <h1 className="section-title mb-2">Служба <span>поддержки</span></h1>
      <p className="font-roboto text-muted-foreground text-sm mb-10">Мы поможем решить любую проблему с сервером или покупками</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-2xl">
        {[
          { icon: "MessageCircle", title: "Discord", desc: "Основной канал поддержки. Ответим в течение 1 часа", action: "Перейти в Discord" },
          { icon: "Mail", title: "Email", desc: "Для официальных обращений и споров", action: "Написать письмо" },
        ].map(c => (
          <div key={c.title} className="card-product p-6 text-center">
            <div className="w-12 h-12 border border-primary/40 flex items-center justify-center mx-auto mb-4">
              <Icon name={c.icon} size={22} className="text-primary" />
            </div>
            <h3 className="font-oswald text-base uppercase tracking-wide mb-2">{c.title}</h3>
            <p className="font-roboto text-xs text-muted-foreground mb-4 leading-relaxed">{c.desc}</p>
            <button className="btn-secondary text-xs w-full">{c.action}</button>
          </div>
        ))}
      </div>

      <div className="card-product p-6">
        <h2 className="font-oswald text-xl uppercase tracking-wider mb-6 border-b border-border pb-4">Частые вопросы</h2>
        <div className="space-y-2">
          {[
            { q: "Как быстро выдаётся товар после оплаты?", a: "Товары выдаются автоматически в течение 1-5 минут. Если вы онлайн на сервере — мгновенно." },
            { q: "Что делать если товар не выдали?", a: "Обратитесь в поддержку через Discord с указанием Steam ID и скриншотом оплаты. Решим в течение 24 часов." },
            { q: "Можно ли вернуть деньги?", a: "Возврат средств возможен только при технической ошибке (товар не выдан). Цифровые товары после активации возврату не подлежат." },
            { q: "Сохраняются ли привилегии при вайпе?", a: "Привилегии (VIP, MVP, ELITE) сохраняются при вайпах. Предметы выдаются заново автоматически после вайпа." },
            { q: "Как подключиться к серверу?", a: "В Steam откройте DayZ → Найти серверы → поиск по имени «DayZ Server». Или прямое подключение по IP из нашего Discord." },
          ].map(faq => (
            <details key={faq.q} className="group border border-border">
              <summary className="font-oswald text-sm uppercase tracking-wide px-4 py-4 cursor-pointer text-foreground hover:text-primary transition-colors list-none flex items-center justify-between">
                {faq.q}
                <Icon name="ChevronDown" size={16} className="text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0" />
              </summary>
              <div className="font-roboto text-sm text-muted-foreground px-4 pb-4 leading-relaxed border-t border-border pt-3">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────
export default function Index() {
  const [activePage, setActivePage] = useState("home");

  const renderPage = () => {
    switch (activePage) {
      case "home": return <HomePage setActive={setActivePage} />;
      case "catalog": return <CatalogPage setActive={setActivePage} />;
      case "cabinet": return <CabinetPage setActive={setActivePage} />;
      case "topup": return <TopupPage />;
      case "legal": return <LegalPage />;
      case "support": return <SupportPage />;
      default: return <HomePage setActive={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar active={activePage} setActive={setActivePage} />
      <main>{renderPage()}</main>

      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border border-primary/40 flex items-center justify-center">
                <Icon name="Skull" size={12} className="text-primary" />
              </div>
              <span className="font-oswald text-sm uppercase tracking-widest text-muted-foreground">
                Outpost<span className="text-primary">.</span>DayZ
              </span>
            </div>
            <div className="flex gap-6">
              <button onClick={() => setActivePage("legal")} className="font-roboto text-xs text-muted-foreground hover:text-primary transition-colors">Соглашение</button>
              <button onClick={() => setActivePage("legal")} className="font-roboto text-xs text-muted-foreground hover:text-primary transition-colors">Конфиденциальность</button>
              <button onClick={() => setActivePage("support")} className="font-roboto text-xs text-muted-foreground hover:text-primary transition-colors">Поддержка</button>
            </div>
            <p className="font-roboto text-xs text-muted-foreground">
              © 2026 Outpost. Не аффилирован с Bohemia Interactive.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}