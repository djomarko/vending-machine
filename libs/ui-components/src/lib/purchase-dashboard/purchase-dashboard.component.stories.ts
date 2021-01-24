import { PurchaseDashboardComponent } from './purchase-dashboard.component';

export default {
    title: 'PurchaseDashboardComponent',
};

const Template = (args: PurchaseDashboardComponent) => ({
    moduleMetadata: {
        imports: [],
    },
    component: PurchaseDashboardComponent,
    props: {
        ...args,
    },
});

export const Primary = Template.bind({});
Primary.args = {
    payment: 0,
    products: [
        {
            name: 'can',
            icon: 'can.svg',
            price: 1.20,
        },
    ],
};
