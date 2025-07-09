# Платіжна система з використанням Factory патернів

Реалізація імітаційної архітектури платіжної системи, яка підтримує кілька провайдерів: Stripe, PayPal і Apple Pay.

## Структура проєкту

```
src/
├── core/
│   ├── PaymentProvider.ts         # Інтерфейс платіжного провайдера
│   └── PaymentProviderFactory.ts  # Інтерфейс фабрики провайдерів
├── providers/
│   ├── stripe/
│   │   ├── StripePaymentProvider.ts  # Реалізація Stripe провайдера
│   │   └── StripeFactory.ts          # Фабрика для Stripe
│   ├── paypal/
│   │   ├── PaypalPaymentProvider.ts  # Реалізація PayPal провайдера
│   │   └── PaypalFactory.ts          # Фабрика для PayPal
│   └── apple/
│       ├── ApplePaymentProvider.ts   # Реалізація Apple Pay провайдера
│       └── AppleFactory.ts           # Фабрика для Apple Pay
├── app/
│   └── PaymentContext.ts         # Контекст для роботи з провайдерами
└── main.ts                      # Приклад використання
```

## Використані патерни

### Factory Method
Кожен провайдер має свою фабрику, яка створює відповідний платіжний сервіс:
- `StripeFactory` створює `StripePaymentProvider`
- `PaypalFactory` створює `PaypalPaymentProvider`
- `AppleFactory` створює `ApplePaymentProvider`

### Abstract Factory
Всі фабрики реалізують спільний інтерфейс `PaymentProviderFactory`, що дозволяє використовувати їх взаємозамінно.

### Strategy (частково)
`PaymentContext` працює з будь-яким провайдером через інтерфейс `PaymentProvider`, приховуючи деталі реалізації.

## Переваги архітектури

- **Відокремлення створення об'єктів** - використання `new` тільки у фабриках
- **Легке розширення** - для додавання нового провайдера достатньо створити нову папку з відповідними класами
- **Типова безпека** - всі взаємодії через інтерфейси
- **Взаємозамінність** - всі провайдери реалізують однаковий інтерфейс

## Запуск проєкту

### Встановлення залежностей
```bash
npm install
```

### Запуск з різними провайдерами

**Stripe (за замовчуванням):**
```bash
npx ts-node src/main.ts stripe
```

**PayPal:**
```bash
npx ts-node src/main.ts paypal
```

**Apple Pay:**
```bash
npx ts-node src/main.ts apple
```

**Без аргументу (Stripe за замовчуванням):**
```bash
npx ts-node src/main.ts
```

## Приклад виведення

### Stripe:
```
Starting payment process for $100
[Stripe] Authorizing $100
[Stripe] Capturing transaction txn_1752053538452
[Stripe] Refunding transaction txn_1752053538452
Payment process completed for $100
```

### PayPal:
```
Starting payment process for $100
[PayPal] Authorizing $100
[PayPal] Capturing transaction txn_1752053538452
[PayPal] Refunding transaction txn_1752053538452
Payment process completed for $100
```

### Apple Pay:
```
Starting payment process for $100
[ApplePay] Authorizing $100
[ApplePay] Capturing transaction txn_1752053538452
[ApplePay] Refunding transaction txn_1752053538452
Payment process completed for $100
```

## Функціональність

Кожен платіжний провайдер реалізує повний цикл обробки платежу:
1. **Authorize** - авторизація платежу на певну суму
2. **Capture** - захоплення авторизованого платежу
3. **Refund** - повернення коштів по транзакції

Вся функціональність реалізована через `console.log` для демонстрації роботи системи.