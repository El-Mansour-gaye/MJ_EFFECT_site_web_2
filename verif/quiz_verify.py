
from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto('http://localhost:3000/quiz')
        # Attendre que les animations se chargent
        time.sleep(5)
        page.screenshot(path='/home/jules/verification/quiz_page.png')
        browser.close()

if __name__ == "__main__":
    run()
