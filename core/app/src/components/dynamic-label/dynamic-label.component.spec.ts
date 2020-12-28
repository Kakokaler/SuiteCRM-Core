import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {Field} from '@app-common/record/field.model';
import {DynamicLabelModule} from '@components/dynamic-label/dynamic-label.module';
import {UserPreferenceStore} from '@store/user-preference/user-preference.store';
import {userPreferenceStoreMock} from '@store/user-preference/user-preference.store.spec.mock';
import {NumberFormatter} from '@services/formatters/number/number-formatter.service';
import {numberFormatterMock} from '@services/formatters/number/number-formatter.spec.mock';
import {DatetimeFormatter} from '@services/formatters/datetime/datetime-formatter.service';
import {datetimeFormatterMock} from '@services/formatters/datetime/datetime-formatter.service.spec.mock';
import {DateFormatter} from '@services/formatters/datetime/date-formatter.service';
import {dateFormatterMock} from '@services/formatters/datetime/date-formatter.service.spec.mock';
import {CurrencyFormatter} from '@services/formatters/currency/currency-formatter.service';
import {currencyFormatterMock} from '@services/formatters/currency/currency-formatter.service.spec.mock';
import {LanguageStore} from '@store/language/language.store';
import {languageStoreMock} from '@store/language/language.store.spec.mock';

@Component({
    selector: 'dynamic-label-test-host-component',
    template: '<scrm-dynamic-label [template]="template" [fields]="fields" [context]="context"></scrm-dynamic-label>'
})
class DynamicLabelTestHostComponent {
    template = '{{fields.name.label}} {{fields.name.value}} | {{fields.amount.label}}: {{fields.amount.value}} | Min: {{context.min|int}}';
    context = {
        min: '1000',
        module: 'accounts'
    };
    fields = {
        name: {
            value: 'Some Company',
            labelKey: 'LBL_NAME',
            type: 'varchar'
        } as Field,
        amount: {
            value: '1000.50',
            labelKey: 'LBL_AMOUNT',
            type: 'currency',
        } as Field
    };
}


describe('DynamicLabelComponent', () => {
    let testHostComponent: DynamicLabelTestHostComponent;
    let testHostFixture: ComponentFixture<DynamicLabelTestHostComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DynamicLabelTestHostComponent,
            ],
            imports: [
                DynamicLabelModule
            ],
            providers: [
                {provide: UserPreferenceStore, useValue: userPreferenceStoreMock},
                {provide: NumberFormatter, useValue: numberFormatterMock},
                {provide: DatetimeFormatter, useValue: datetimeFormatterMock},
                {provide: DateFormatter, useValue: dateFormatterMock},
                {provide: CurrencyFormatter, useValue: currencyFormatterMock},
                {provide: LanguageStore, useValue: languageStoreMock},
            ],
        }).compileComponents();

        testHostFixture = TestBed.createComponent(DynamicLabelTestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
        testHostFixture.detectChanges();
    }));

    it('should render', () => {
        expect(testHostComponent).toBeTruthy();
    });

    it('should have label', () => {

        expect(testHostComponent).toBeTruthy();

        const element = testHostFixture.nativeElement.getElementsByClassName('dynamic-label').item(0);
        const expected = 'Name: Some Company | Amount: $1,000.50 | Min: 1,000';

        expect(element).toBeTruthy();
        expect(element.textContent).toContain(expected);
    });
});
