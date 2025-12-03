
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        await page.goto("http://localhost:3000")

        # Find the heading element and scroll to it
        heading_selector = """h2:has-text("Explorez l'Univers MJ Effect")"""
        await page.locator(heading_selector).scroll_into_view_if_needed()

        # Wait for any potential animations or lazy loading
        await page.wait_for_timeout(2000)

        # Capture screenshot at medium width
        await page.set_viewport_size({"width": 800, "height": 600})
        await page.screenshot(path="/home/jules/verification/responsive-layout-medium.png")

        # Capture screenshot at small width
        await page.set_viewport_size({"width": 400, "height": 800}) # Increased height for small screens
        await page.screenshot(path="/home/jules/verification/responsive-layout-small.png")

        await browser.close()

asyncio.run(main())
