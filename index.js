#!/user/bin/eve node
import inquirer from "inquirer";
;
let users = [
    {
        userID: "Mahjabeen",
        userPin: 2222
    },
    {
        userID: "Ayesha",
        userPin: 9805
    }, {
        userID: "Arif",
        userPin: 6574
    }
];
let balance = Math.floor((Math.random() * 100000));
let transfer;
let mybalance;
startLoop();
async function startLoop() {
    await getuserID();
    do {
        await getTransaction();
        var again = await inquirer.prompt([
            {
                type: "list",
                name: "restart",
                choices: ["yes", "No"],
                message: "do you wanto continue:"
            }
        ]);
    } while (again.restart == "yes");
}
async function getuserID() {
    transfer = await inquirer.prompt([
        {
            type: "input",
            name: "userID",
            massege: "Enter your user Id"
        }, {
            type: "number",
            name: "userPin",
            massege: "Enter your user Pin"
        }
    ]);
    await checkuserID(transfer.userID, transfer.userPin);
}
async function checkuserID(userID, userPin) {
    let condition = false;
    for (let i = 0; i < users.length; i++) {
        if (userID === users[i].userID && userPin === users[i].userPin) {
            condition = true;
            break;
        }
    }
    if (condition) {
        console.log("invalid user id or pin");
        await getuserID();
    }
}
;
async function getTransaction() {
    mybalance = await inquirer.prompt([
        {
            name: "Acounttype",
            type: "list",
            massege: "choose your account ",
            choices: ["current", "saving"]
        }, {
            name: "transectiontype",
            type: "list",
            massege: "choose your Transection type ",
            choices: ["Fastcash", "withdraw"]
        }, {
            name: "Amount",
            type: "list",
            choices: [5000, 10000, 15000, 20000, 25000],
            massege: `Enter your Amount further your current amount is : ${balance} `,
            when(transfer) {
                return transfer.transectiontype == "Fastcash";
            },
        }, {
            name: "Amount",
            type: "list",
            choices: [5000, 10000, 15000, 20000, 25000],
            massege: `Enter your Amount further your current amount is : ${balance} `,
            when(transfer) {
                return transfer.transectiontype == "withdraw";
            },
        }
    ]);
    if (transfer.userID && transfer.userPin) {
        if (mybalance.Amount <= balance) {
            balance = balance - mybalance.Amount;
            console.log(`your current balance is ${balance}`);
        }
        else {
            console.log(`sorry your balnce is in limit ${balance}`);
        }
    }
}
