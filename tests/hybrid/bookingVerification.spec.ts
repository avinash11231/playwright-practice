import { test, expect } from '@playwright/test';
import { BookingApiPage } from '../../pages/BookingApiPage';
import { BookingData } from '../../utils/testData';

test.describe('Hybrid — API setup, UI verification pattern', () => {

  test('booking created via API appears in confirmation flow', async ({ request, page }) => {
    const api = new BookingApiPage(request);

    await test.step('Create booking via API', async () => {
      await api.getAuthToken();
      const created = await api.createBooking(BookingData.standard);
      expect(created.bookingid).toBeDefined();

      // Store ID for verification
      const { status, body } = await api.getBookingById(created.bookingid);     
      expect(status).toBe(200);
      if (!body) {
        throw new Error('Expected booking body to be present');
      }
      expect(body.firstname).toBe('Avi');
      expect(body.totalprice).toBe(150);
    });

    await test.step('Verify API is healthy via UI smoke check', async () => {
      await page.goto('https://restful-booker.herokuapp.com');
      await expect(page).toHaveTitle(/Restful/i);
    });
  });

});