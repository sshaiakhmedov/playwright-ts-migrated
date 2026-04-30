import { Page, Locator } from '@playwright/test';
import { Base } from './Base.page';

export class Legal extends Base {
  static readonly URLS = {
    /** Deep link / footer «Контакты» — same page object as legal, without #legal. */
    CONTACTS_PLAIN: '/ru/contacts',
    /** Footer «Контакты»: same screen as «Правовая информация», different URL (no #legal fragment). */
    CONTACTS_PAGE: /\/ru\/contacts\/?$/,
    /** Same contacts route with optional legal anchor (deep links, footer «Правовая информация»). */
    CONTACTS_OR_LEGAL_PAGE: /\/ru\/contacts\/?(#legal)?$/,
    LEGAL_PAGE: '/ru/contacts#legal',
    PERECHEN_VIDOV_DEYATELNOSTI: '/ru/pages/it',
    VACANCIES: '/ru/jobs',
    FAQ_PAGE: '/ru/faq',
    KARTOCHKA_YUR_LITSA: 'https://disk.360.yandex.ru/i/L7_4fV3uqgT2_A',
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

  specialistCardImage(cardLocator: Locator): Locator {
    return cardLocator.locator('.professional__photo');
  }

  specialistCardEmail(cardLocator: Locator): Locator {
    return cardLocator.locator('.professional__email');
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
  async mainPageComponentsArePresent(): Promise<void> {
    await this.page.waitForURL(Legal.URLS.CONTACTS_OR_LEGAL_PAGE);
    await this.supportSection.section.waitFor({ state: 'visible' });
    await this.professionalsSection.section.waitFor({ state: 'visible' });
    await this.pageLinks.faq.waitFor({ state: 'visible' });
    await this.footer.componentIsLoaded();
  }

  async pageIsLoaded(): Promise<void> {
    await this.mainPageComponentsArePresent();
  }
}
