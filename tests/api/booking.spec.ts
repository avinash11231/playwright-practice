import { test, expect } from '@playwright/test';
import { BookingApiPage } from '../../pages/BookingApiPage';
import { BookingData } from '../../utils/testData';

test.describe('Restful-Booker API', () => {

  test('GET /booking returns list of bookings', async ({ request }) => {
    const api = new BookingApiPage(request);
    const { status, body } = await api.getAllBookings();

    expect(status).toBe(200);
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('bookingid');
  });

  test('GET /booking/:id returns correct booking', async ({ request }) => {
    const api = new BookingApiPage(request);

    // First get a valid ID from the list
    const { body: bookings } = await api.getAllBookings();
    const firstId = bookings[0].bookingid;

    const { status, body } = await api.getBookingById(firstId);

    expect(status).toBe(200);
    expect(body).toHaveProperty('firstname');
    expect(body).toHaveProperty('lastname');
    expect(body).toHaveProperty('totalprice');
    expect(body).toHaveProperty('bookingdates');
  });

  test('POST /booking creates a new booking', async ({ request }) => {
    const api = new BookingApiPage(request);
    const created = await api.createBooking(BookingData.standard);

    expect(created.bookingid).toBeDefined();
    expect(created.booking.firstname).toBe('Avi');
    expect(created.booking.lastname).toBe('Mathew');
    expect(created.booking.totalprice).toBe(150);
    expect(created.booking.depositpaid).toBe(true);
  });

  test('POST /auth returns a valid token', async ({ request }) => {
    const api = new BookingApiPage(request);
    const token = await api.getAuthToken();

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  test('PUT /booking updates an existing booking', async ({ request }) => {
    const api = new BookingApiPage(request);

    // Create a booking to update
    await api.getAuthToken();
    const created = await api.createBooking(BookingData.standard);
    const id = created.bookingid;

    // Update it
    const { status, body } = await api.updateBooking(id, BookingData.updated);

    expect(status).toBe(200);
    expect(body.totalprice).toBe(200);
    expect(body.bookingdates.checkin).toBe('2025-07-01');
  });


  test('DELETE /booking removes the booking', async ({ request }) => {
    const api = new BookingApiPage(request);
  
    await api.getAuthToken();
    const created = await api.createBooking(BookingData.standard);
    const id = created.bookingid;
  
    const deleteStatus = await api.deleteBooking(id);
    expect(deleteStatus).toBe(201);
  
    // Verify it's gone — expect 404, body will be null
    const { status } = await api.getBookingById(id);
    expect(status).toBe(404);
  });

  

  



});