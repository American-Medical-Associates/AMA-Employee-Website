from selenium import webdriver
from selenium.webdriver.common import action_chains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.options import Options

chrome_options = Options()

chrome_options.add_argument("--incognito")
chrome_options.add_argument("--lang=en-us")
chrome_options.add_argument("--disable-web-security")
chrome_options.add_argument("--allow-running-insecure-content")


driver = webdriver.Chrome()
action = ActionChains(driver)
driver.get('https://www.indeed.com/?from=gnav-homepage')


def add_patient_ECW(patient):

    pass
