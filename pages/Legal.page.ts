import { Page, expect } from '@playwright/test';
import { Base } from './Base.page';

export class Legal extends Base {
  static readonly URLS = {
    LEGAL_PAGE: '/ru/contacts#legal',
    PERECHEN_VIDOV_DEYATELNOSTI: '/ru/pages/it',
    VACANCIES: '/ru/jobs',
    FAQ_PAGE: '/ru/faq',
  } as const;

  readonly path = Legal.URLS.LEGAL_PAGE;

  constructor(page: Page) {
    super(page);
  }

  // Locators
  get supportSection() {
    const section = this.page.locator('.section__support').first();
    return {
      section,
      title: section.getByText('Служба поддержки'),
      subtitle: section.getByText(
        'Мы рады ответить на ваши вопросы ежедневно с 9:00 до 21:00 по Москве. Обратите внимание, что заказы принимаются только на сайте.',
      ),
      info: section.getByText('Быстро найти ответ на свой вопрос можно в '),
      contactMethodsBlock: section.locator('b-contacts__methods').first(),
    };
  }

  get professionalsSection() {
    const section = this.page.locator('.section__professionals').first();
    return {
      section,
      title: section.getByText('Специалисты «Спутника»'),
      specialistCard: section.locator('.c-contacts__professional'), // last one should be excliuded via .not(:last-child)
    };
  }

  get pageLinks() {
    return {
      faq: this.page.getByRole('link', { name: 'Часто задаваемых вопросах', exact: true }),
      vacancies: this.page.locator(`a[href="${Legal.URLS.VACANCIES}"]`).first(),
      karochka_yur_litsa: this.page.getByRole('link', { name: 'Открыть на Я.Диске', exact: true }),
      perechenVidovDeyatelnosti: this.page.getByRole('link', {
        name: 'Перечень видов деятельности в области ИТ, используемые технологии, права владения',
        exact: true,
      }),
    };
  }

  // Methods
  async pageIsLoaded(): Promise<void> {
    await this.footer.componentIsLoaded();
  }
}
