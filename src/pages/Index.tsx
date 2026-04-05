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

const CATEGORIES = ["Все", "VIP", "Снаряжение", "Транспорт", "Ресурсы"];

const PRODUCTS = [
  { id: 1, name: "VIP", category: "VIP", price: 299, badge: "Хит", desc: "Позволяет быстрее подключаться к серверу игнорируя очередь", icon: "Crown" },
  // Транспорт
  { id: 2, name: "GUNTER 2", category: "Транспорт", price: 350, badge: null, desc: "Единоразовая выдача. Автомобиль спавнится в игровом мире", icon: "Car" },
  { id: 3, name: "OLGA 24", category: "Транспорт", price: 350, badge: null, desc: "Единоразовая выдача. Автомобиль спавнится в игровом мире", icon: "Car" },
  { id: 4, name: "ADA 4X4", category: "Транспорт", price: 350, badge: null, desc: "Единоразовая выдача. Автомобиль спавнится в игровом мире", icon: "Car" },
  { id: 5, name: "SARKA 120", category: "Транспорт", price: 350, badge: null, desc: "Единоразовая выдача. Автомобиль спавнится в игровом мире", icon: "Car" },
  { id: 6, name: "V3S", category: "Транспорт", price: 450, badge: null, desc: "Единоразовая выдача. Грузовик спавнится в игровом мире", icon: "Truck" },
  { id: 7, name: "HUMVEE", category: "Транспорт", price: 500, badge: "Редкое", desc: "Единоразовая выдача. Военный джип спавнится в игровом мире", icon: "Truck" },
  // Снаряжение
  { id: 10, name: "ATACS", category: "Снаряжение", price: 700, badge: null, desc: "Military Clothing Retexture — камуфляж ATACS. Действует 30 дней. Капюшон в слот очков, шлем на голову", icon: "Shield" },
  { id: 11, name: "MULTICAM", category: "Снаряжение", price: 700, badge: null, desc: "Military Clothing Retexture — камуфляж MULTICAM. Действует 30 дней. Капюшон в слот очков, шлем на голову", icon: "Shield" },
  { id: 12, name: "PIXEL", category: "Снаряжение", price: 700, badge: null, desc: "Military Clothing Retexture — камуфляж PIXEL. Действует 30 дней. Капюшон в слот очков, шлем на голову", icon: "Shield" },
  { id: 13, name: "ACUPAT", category: "Снаряжение", price: 700, badge: null, desc: "Military Clothing Retexture — камуфляж ACUPAT. Действует 30 дней. Капюшон в слот очков, шлем на голову", icon: "Shield" },
  { id: 14, name: "BLACK OPS", category: "Снаряжение", price: 700, badge: null, desc: "Military Clothing Retexture — камуфляж BLACK OPS. Действует 30 дней. Капюшон в слот очков, шлем на голову", icon: "Shield" },
  { id: 15, name: "FLORA", category: "Снаряжение", price: 700, badge: null, desc: "Military Clothing Retexture — камуфляж FLORA. Действует 30 дней. Капюшон в слот очков, шлем на голову", icon: "Shield" },
  { id: 16, name: "MULTICAM DESERT", category: "Снаряжение", price: 700, badge: null, desc: "Military Clothing Retexture — камуфляж MULTICAM DESERT. Действует 30 дней. Капюшон в слот очков, шлем на голову", icon: "Shield" },
  { id: 17, name: "VEGETATO", category: "Снаряжение", price: 700, badge: null, desc: "Military Clothing Retexture — камуфляж VEGETATO. Действует 30 дней. Капюшон в слот очков, шлем на голову", icon: "Shield" },
  { id: 18, name: "WOODLAND", category: "Снаряжение", price: 700, badge: null, desc: "Military Clothing Retexture — камуфляж WOODLAND. Действует 30 дней. Капюшон в слот очков, шлем на голову", icon: "Shield" },
  { id: 19, name: "WOODS", category: "Снаряжение", price: 700, badge: null, desc: "Military Clothing Retexture — камуфляж WOODS. Действует 30 дней. Капюшон в слот очков, шлем на голову", icon: "Shield" },
  { id: 20, name: "GHILLE BLACK", category: "Снаряжение", price: 700, badge: null, desc: "Маскировочный костюм Ghille Black. Действует 30 дней. Капюшон в слот очков, шлем на голову", icon: "Eye" },
  // Ресурсы
  { id: 30, name: "Бревна 2 шт", category: "Ресурсы", price: 20, badge: null, desc: "2 бревна для строительства", icon: "Package" },
  { id: 31, name: "Бревна 10 шт", category: "Ресурсы", price: 100, badge: "Выгодно", desc: "10 брёвен для строительства", icon: "Package" },
  { id: 32, name: "Доски 10 шт", category: "Ресурсы", price: 20, badge: null, desc: "10 досок для строительства", icon: "Package" },
  { id: 33, name: "Доски 30 шт", category: "Ресурсы", price: 50, badge: null, desc: "30 досок для строительства", icon: "Package" },
  { id: 34, name: "Доски 100 шт", category: "Ресурсы", price: 100, badge: "Выгодно", desc: "100 досок для строительства", icon: "Package" },
  { id: 35, name: "Пачка гвоздей", category: "Ресурсы", price: 50, badge: null, desc: "Гвозди для строительства", icon: "Wrench" },
  { id: 36, name: "Топорик", category: "Ресурсы", price: 45, badge: null, desc: "Инструмент для рубки и строительства", icon: "Axe" },
  { id: 37, name: "Колун", category: "Ресурсы", price: 45, badge: null, desc: "Инструмент для заготовки дров", icon: "Axe" },
  { id: 38, name: "Лопата", category: "Ресурсы", price: 45, badge: null, desc: "Инструмент для земляных работ", icon: "Shovel" },
  { id: 39, name: "Плоскогубцы", category: "Ресурсы", price: 45, badge: null, desc: "Инструмент для монтажа и ремонта", icon: "Wrench" },
  { id: 40, name: "Проволока", category: "Ресурсы", price: 40, badge: null, desc: "Используется для ограждений и крафта", icon: "Package" },
  { id: 41, name: "Ножовка", category: "Ресурсы", price: 45, badge: null, desc: "Инструмент для распиловки досок", icon: "Wrench" },
  { id: 42, name: "Точильный камень", category: "Ресурсы", price: 40, badge: null, desc: "Для заточки ножей и инструментов", icon: "Package" },
  { id: 43, name: "Кодовый замок", category: "Ресурсы", price: 70, badge: null, desc: "Защита базы кодовым замком", icon: "Lock" },
  { id: 44, name: "Фляга с водой", category: "Ресурсы", price: 30, badge: null, desc: "Питьевая вода для выживания", icon: "Droplets" },
  { id: 45, name: "Бекон", category: "Ресурсы", price: 30, badge: null, desc: "Еда для восстановления здоровья", icon: "Package" },
  { id: 46, name: "Тетрациклин", category: "Ресурсы", price: 45, badge: null, desc: "Антибиотик для лечения болезней", icon: "Heart" },
  { id: 47, name: "Отвертка", category: "Ресурсы", price: 20, badge: null, desc: "Инструмент для ремонта транспорта", icon: "Wrench" },
  { id: 48, name: "Морфин", category: "Ресурсы", price: 40, badge: null, desc: "Обезболивающее для лечения переломов", icon: "Heart" },
  { id: 49, name: "Адреналин", category: "Ресурсы", price: 40, badge: null, desc: "Экстренное восстановление жизненных сил", icon: "Heart" },
  { id: 50, name: "Свеча зажигания", category: "Ресурсы", price: 40, badge: null, desc: "Запчасть для ремонта автомобилей", icon: "Zap" },
  { id: 51, name: "Радиатор", category: "Ресурсы", price: 40, badge: null, desc: "Запчасть для ремонта транспорта", icon: "Gauge" },
  { id: 52, name: "Аккумулятор", category: "Ресурсы", price: 50, badge: null, desc: "Аккумулятор для легкового транспорта", icon: "Battery" },
  { id: 53, name: "Аккумулятор для грузовика", category: "Ресурсы", price: 60, badge: null, desc: "Аккумулятор для грузового транспорта", icon: "Battery" },
  { id: 54, name: "Канистра с топливом", category: "Ресурсы", price: 40, badge: null, desc: "Топливо для транспортных средств", icon: "Fuel" },
  { id: 55, name: "Свеча накаливания", category: "Ресурсы", price: 40, badge: null, desc: "Запчасть для ремонта дизельных машин", icon: "Zap" },
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

const HERO_IMAGE = "https://cdn.poehali.dev/projects/3cb6e349-c73c-4755-a2ab-0da11e75c9c7/bucket/ca652b88-114f-4b1f-9982-44be187adba7.png";

// ─── NAVBAR ─────────────────────────────────────────────────────
function Navbar({ active, setActive }: { active: string; setActive: (id: string) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={() => setActive("home")} className="flex items-center gap-3 group">
          <div className="w-8 h-8 border border-white/60 flex items-center justify-center animate-pulse-glow">
            <Icon name="Skull" size={16} className="text-white" />
          </div>
          <span className="font-oswald text-lg uppercase tracking-widest text-foreground group-hover:text-white transition-colors">
            Outpost<span className="text-white">.</span>DayZ
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
              <span className="text-white glow-text">или умри</span>
            </h1>

            <p className="font-roboto text-muted-foreground text-lg mb-8 leading-relaxed animate-fade-in delay-200">
              Официальный сайт проекта Outpost.<br />
              Снаряжение, привилегии и транспорт — для тех, кто хочет выжить.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in delay-300">
              <button onClick={() => setActive("cabinet")} className="btn-secondary text-sm">
                Войти через Steam
              </button>
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
            { icon: "Users", title: "Сообщество", desc: "Присоединяйтесь к нашему Discord каналу" },
          ].map((f, i) => (
            <div key={f.title} className={`card-product p-6 animate-fade-in delay-${(i + 1) * 100}`}>
              <div className="w-10 h-10 border border-white/40 flex items-center justify-center mb-4">
                <Icon name={f.icon} size={20} className="text-white" />
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
            className="w-full bg-card border border-border pl-10 pr-4 py-3 font-roboto text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-white/50 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-oswald text-xs uppercase tracking-wider px-4 py-3 border transition-colors ${
                activeCategory === cat
                  ? "border-white bg-white/10 text-white"
                  : "border-border text-muted-foreground hover:border-white/40 hover:text-foreground"
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
                <Icon name={product.icon} size={18} className="text-white" fallback="Package" />
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
                <span className="font-oswald text-xl text-white">{product.price} <span className="text-sm">₽</span></span>
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
            <button onClick={() => setActive("legal")} className="text-white hover:underline">
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
            <div className="w-16 h-16 border border-white/40 flex items-center justify-center mx-auto mb-3">
              <Icon name="User" size={28} className="text-white" />
            </div>
            <div className="font-oswald text-lg uppercase">SurvivorXX</div>
            <div className="font-roboto text-xs text-muted-foreground">Steam ID: 76561198...</div>
            <div className="mt-4 p-3 bg-muted border border-border">
              <div className="font-roboto text-xs text-muted-foreground mb-1">Баланс</div>
              <div className="font-oswald text-2xl text-white">320 ₽</div>
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
                    ? "border-white/40 bg-white/10 text-white"
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
                      <div className="font-oswald text-base text-white">{purchase.price} ₽</div>
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
                    ? "border-white bg-white/10 text-white"
                    : "border-border text-muted-foreground hover:border-white/40"
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
                className="w-full bg-muted border border-border px-4 py-3 font-oswald text-lg text-foreground focus:outline-none focus:border-white/50 pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-oswald text-muted-foreground">₽</span>
            </div>
          </div>

          <div className="p-4 bg-muted border border-border text-center">
            <div className="font-roboto text-xs text-muted-foreground mb-1">Будет зачислено на баланс</div>
            <div className="font-oswald text-3xl text-white">{amount || "0"} ₽</div>
          </div>
        </div>

        <div className="card-product p-6">
          <h2 className="font-oswald text-lg uppercase tracking-wider mb-6">Способ оплаты</h2>
          <div className="space-y-3">
            {PAYMENT_METHODS.map(method => (
              <button
                key={method.name}
                className="w-full flex items-center gap-4 p-4 bg-muted border border-border hover:border-white/40 transition-colors group"
              >
                <div className="w-10 h-10 border border-border group-hover:border-white/40 flex items-center justify-center flex-shrink-0 transition-colors">
                  <Icon name={method.icon} size={18} className="text-muted-foreground group-hover:text-white transition-colors" fallback="CreditCard" />
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
                ? "border-white bg-white/10 text-white"
                : "border-border text-muted-foreground hover:border-white/40"
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
          { icon: "MessageCircle", title: "Discord", desc: "Основной канал поддержки. Ответим в течение 1 часа", action: "Перейти в Discord", href: "https://discord.gg/jcc9y6WGju" },
          { icon: "Mail", title: "Email", desc: "Для официальных обращений и споров", action: "Написать письмо", href: null },
        ].map(c => (
          <div key={c.title} className="card-product p-6 text-center">
            <div className="w-12 h-12 border border-white/40 flex items-center justify-center mx-auto mb-4">
              <Icon name={c.icon} size={22} className="text-white" />
            </div>
            <h3 className="font-oswald text-base uppercase tracking-wide mb-2">{c.title}</h3>
            <p className="font-roboto text-xs text-muted-foreground mb-4 leading-relaxed">{c.desc}</p>
            {c.href ? (
              <a href={c.href} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs w-full block text-center">{c.action}</a>
            ) : (
              <button className="btn-secondary text-xs w-full">{c.action}</button>
            )}
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
              <summary className="font-oswald text-sm uppercase tracking-wide px-4 py-4 cursor-pointer text-foreground hover:text-white transition-colors list-none flex items-center justify-between">
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
              <div className="w-6 h-6 border border-white/40 flex items-center justify-center">
                <Icon name="Skull" size={12} className="text-white" />
              </div>
              <span className="font-oswald text-sm uppercase tracking-widest text-muted-foreground">
                Outpost<span className="text-white">.</span>DayZ
              </span>
            </div>
            <div className="flex gap-6">
              <button onClick={() => setActivePage("legal")} className="font-roboto text-xs text-muted-foreground hover:text-white transition-colors">Соглашение</button>
              <button onClick={() => setActivePage("legal")} className="font-roboto text-xs text-muted-foreground hover:text-white transition-colors">Конфиденциальность</button>
              <button onClick={() => setActivePage("support")} className="font-roboto text-xs text-muted-foreground hover:text-white transition-colors">Поддержка</button>
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