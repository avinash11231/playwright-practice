import { APIRequestContext } from '@playwright/test';

export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds?: string;
}

export interface BookingResponse {
  bookingid: number;
  booking: Booking;
}

export class BookingApiPage {
  private request: APIRequestContext;
  private baseUrl = 'https://restful-booker.herokuapp.com';
  private token: string = '';

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getAuthToken(): Promise<string> {
    const response = await this.request.post(`${this.baseUrl}/auth`, {
      data: { username: 'admin', password: 'password123' }
    });
    const body = await response.json();
    this.token = body.token;
    return this.token;
  }

  async getAllBookings() {
    const response = await this.request.get(`${this.baseUrl}/booking`);
    return {
      status: response.status(),
      body: await response.json()
    };
  }

  async getBookingById(id: number): Promise<{ status: number; body: Booking | null }> {
    const response = await this.request.get(`${this.baseUrl}/booking/${id}`);
    const status = response.status();
  
    // Guard against non-JSON responses (e.g. 404 returns plain text "Not Found")
    let body: Booking | null = null;
    if (status === 200) {
      body = await response.json();
    }
  
    return { status, body };
  }

  async createBooking(booking: Booking): Promise<BookingResponse> {
    const response = await this.request.post(`${this.baseUrl}/booking`, {
      data: booking
    });
    return await response.json();
  }

  async updateBooking(id: number, booking: Booking) {
    const response = await this.request.put(`${this.baseUrl}/booking/${id}`, {
      data: booking,
      headers: {
        Cookie: `token=${this.token}`
      }
    });
    return {
      status: response.status(),
      body: await response.json()
    };
  }

  async deleteBooking(id: number) {
    const response = await this.request.delete(`${this.baseUrl}/booking/${id}`, {
      headers: {
        Cookie: `token=${this.token}`
      }
    });
    return response.status();
  }
}