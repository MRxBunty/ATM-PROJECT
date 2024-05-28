import inquirer from "inquirer";

type UserType = {
    name: string;
    pin: number;
    balance: number;
  };
  
  let user: UserType = {
    name: "pin",
    pin: 5982,
    balance: 100000,
  };

  const atm = await inquirer.prompt([
    {
      message: "Please enter your 4 digit pinCode",
      name: "pin",
      type: "input",
    },
  ]);
  let continueTransaction: boolean = true;
  // TODO: Retry on incorrect pin
  if (Number(atm.pin) !== user.pin) {
    console.log("You have entered an incorrect pin");
  } else {
    while (continueTransaction == true) {
      const atm = await inquirer.prompt([
        {
          name: "selectedType",
          message: "Please select an option",
          type: "list",
          choices: ["Withdraw", "Fast Cash", "Balance Inquiry"], // add Deposit, and bill payment
        },
        {
          name: "amount",
          message: "Please select amount",
          type: "list",
          choices: ["500", "1000", "3000", "5000", "8000", "10000"],
          when(atm) {
            return atm.selectedType == "Fast Cash";
          },
        },
        // TODO: amount should be multiple of 500
        {
          name: "amount",
          message: "Please enter amount",
          when(atm) {
            return atm.selectedType == "Withdraw";
          },
        },
      ]);
  
      // TODO: Do you want to try another transaction
      if (atm.selectedType == "Balance Inquiry") {
        console.log(`Your balance is: ${user.balance}`);
        const toRepeat = await inquirer.prompt([
          {
            name: "repeat",
            type: "confirm",
            message: "Do you want to try another transaction",
          },
        ]);
  
        if (toRepeat.repeat == true) continueTransaction = true;
        else {
          continueTransaction = false;
        }
      } else {
        user.balance = user.balance - atm.amount;
        console.log(`Your remaining new balance is: ${user.balance}`);
        continueTransaction = false;
      }
    }
  }