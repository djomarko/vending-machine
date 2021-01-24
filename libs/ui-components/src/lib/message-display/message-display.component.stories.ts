import { MessageDisplayComponent } from './message-display.component';

export default {
  title: 'MessageDisplayComponent'
}


const Template = (args: MessageDisplayComponent) => ({
    moduleMetadata: {
        imports: [],
    },
    component: MessageDisplayComponent,
    props: {
        ...args,
    },
});

export const Primary = Template.bind({});
Primary.args = {
    message: 'Display Text',
    products: [
        {
            name: 'can',
            quantity: 12,
        },
        {
            name: 'bar',
            quantity: 4,
        },
    ],
};
