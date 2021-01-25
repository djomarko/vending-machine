import { ProductDisplayComponent } from './product-display.component';

export default {
    title: 'ProductDisplayComponent',
};

const Template = (args: ProductDisplayComponent) => ({
    moduleMetadata: {
        imports: [],
    },
    component: ProductDisplayComponent,
    props: {
        ...args,
    },
});

export const Primary = Template.bind({});
Primary.args = {
    noise: true,
};
