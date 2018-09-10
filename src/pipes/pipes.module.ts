import { NgModule } from '@angular/core';
import { SanitizeHtmlPipe } from './sanitize-html/sanitize-html';
import { OrderPipe } from './order/order';
@NgModule({
	declarations: [SanitizeHtmlPipe,
    OrderPipe],
	imports: [],
	exports: [SanitizeHtmlPipe,
    OrderPipe]
})
export class PipesModule {}
