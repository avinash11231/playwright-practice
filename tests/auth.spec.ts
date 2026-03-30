import { test, expect } from '../fixtures/auth.fixture';
import { LoginPage } from '../pages/LoginPage';
import { Users } from '../utils/testData';

test.describe('Sauce Demo - Login', () => {


    test('valid login navigates to products page', async ({ loginPage, page }) => {
        await loginPage.login(Users.standard.username, Users.standard.password);
        await expect(page).toHaveURL(/inventory/);
      });

      test('invalid password shows error', async ({ loginPage }) => {
        await loginPage.login(Users.standard.username, 'wrong_password');
        await expect(loginPage.errorMessage).toBeVisible();
      });
    
      test('empty credentials shows error', async ({ loginPage }) => {
        await loginPage.login('', '');
        await expect(loginPage.errorMessage).toContainText('Username is required');
      });
    
      test('locked out user sees error message', async ({ loginPage }) => {
        await loginPage.login(Users.lockedOut.username, Users.lockedOut.password);
        await expect(loginPage.errorMessage).toContainText('locked out');
      });
    
    });