# Custom form

## Redirects the user to our checkout page

### Live example here: https://formexample.repeat.is/

## Purpose

The main objective of this project is to provide developers with a starting point for creating a subscription form that redirects users to a secure payment page. Upon successful payment, the system saves the user's card information and creates a subscription.

## Features

- **Customizable**: The code is designed to be easily customizable to match your specific branding and requirements. This means almost no dependencies and very barebone implementation. You are encouraged to change as much as you can.

- **Typescript**: The "FieldValues" interface is typed exactly according to the requirements when posting to our checkout page. I.e all the non optional values (the ones that dont have a "?" in front of it) are required and not providing them will result in an error.

## Getting Started

To get started, follow these steps:

1. **Clone the Repository**:

```js
   git clone git@github.com:Repeat-is/checkoutForm.git;

   cd checkoutForm

   yarn (or npm install)

   yarn dev
```

2. **Customize, all the relevant code is in App.tsx**: Open the codebase and start customizing it according to your needs. Update styles, labels, and any placeholders to match your application's design language.

- **ReturnUrl**: In your shop settings on Repeat.is you can set your "return url". Once the order has been successfully processed the user will get redirected back to this url.

- **Webhooks and/or API**: You can utilise Webhooks and/or our API once the order has been made.

3. **Testing**: Thoroughly test the application in a controlled environment to ensure the payment flow, card storage, and subscription creation are working as expected.

## Usage

Once you've customized the code and completed testing, you can deploy the application to your preferred hosting environment. Ensure that you maintain security measures to protect user data.

## Contributions

Contributions to this repository are welcome! If you've made improvements, bug fixes, or added new features that could benefit others, feel free to submit a pull request. Anything that can make our examples more valuable to the developer community are most welcome!

## Disclaimer

Please note that while this example provides a foundation for a usable form, it's essential to comply with relevant legal and regulatory standards, especially those related to user data protection and online payments.

**Remember to replace any placeholder values with real data before deploying this code to a production environment.**

## License

This project is licensed under the [MIT License](LICENSE), allowing you to use, modify, and distribute the codebase for your own purposes.

Happy coding!
