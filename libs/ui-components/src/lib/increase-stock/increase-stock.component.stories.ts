import { action } from '@storybook/addon-actions';
import { FormsModule } from '@angular/forms';
import { PurchaseDashboardComponent } from '../purchase-dashboard/purchase-dashboard.component';
import { IncreaseStockComponent } from './increase-stock.component';

export default {
  title: 'IncreaseStockComponent'
}

const Template = (args: IncreaseStockComponent) => ({
    moduleMetadata: {
        imports: [FormsModule],
    },
    component: IncreaseStockComponent,
    props: {
        ...args,
        addProducts: action('addProduct')
    },
});

export const Primary = Template.bind({});
Primary.args = {
    products: [
        {
            name: 'can',
        },
        {
            name: 'bar',
        },
    ],
};
