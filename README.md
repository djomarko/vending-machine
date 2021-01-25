# VendingMachine

Simple vending machine application created in NX Angular.

In order to run the application run ``npm install`` and then ``npm run start``

To run the unit tests run: ``npx nx run-many --all --target=test``

To run the e2e test run ``npm run e2e``

### Assumptions: 
* Action 5: I wasn't quite sure how to implement the buying of 3 cans, so I've created a little animation to delay the dispatching of the can. That way the user can click on the can button multiple times, but in the end only get one can.
