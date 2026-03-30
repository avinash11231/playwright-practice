export const Users = {
    standard: {
      username: 'standard_user',
      password: 'secret_sauce'
    },
    lockedOut: {
      username: 'locked_out_user',
      password: 'secret_sauce'
    },
    problemUser: {
      username: 'problem_user',
      password: 'secret_sauce'
    }
  } as const;
  
  export const ShippingDetails = {
    standard: {
      firstName: 'Avi',
      lastName: 'Mathew',
      postcode: 'H91 XY12'
    }
  } as const;

  export const BookingData = {
    standard: {
      firstname: 'Avi',
      lastname: 'Mathew',
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: '2025-06-01',
        checkout: '2025-06-07'
      },
      additionalneeds: 'Breakfast'
    },
    updated: {
      firstname: 'Avi',
      lastname: 'Mathew',
      totalprice: 200,
      depositpaid: false,
      bookingdates: {
        checkin: '2025-07-01',
        checkout: '2025-07-10'
      },
      additionalneeds: 'Dinner'
    }
  } as const;