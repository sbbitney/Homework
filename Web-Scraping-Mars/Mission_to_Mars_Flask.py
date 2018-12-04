from bs4 import BeautifulSoup
import requests
import pymongo
from splinter import Browser
import pandas as pd
import time 

def init_browser():
    # @NOTE: Replace the path with your actual path to the chromedriver
    executable_path = {"executable_path": "/usr/local/bin/chromedriver"}
    return Browser("chrome", **executable_path, headless=False)


def scrape():
    browser = init_browser()
    mars_data = {}
    url = 'https://mars.nasa.gov/news/'
    browser.visit(url)
    # Retrieve page with the requests module
    #response = requests.get(url)
    # Create BeautifulSoup object; parse with 'lxml'
    soup = BeautifulSoup(browser.html, 'html.parser')
    headlines = soup.find_all('div' ,class_ = 'content_title')
    news_title = []
    headlines
    for headline in headlines:
        variable = (headline.a.text.strip())
        news_title.append(variable)
#adding variable to dictionary 
    mars_data['headline'] = news_title[0]

    body = soup.findAll('div', class_ = 'article_teaser_body')
    news_p = []
    body
    for ch in body:
        paragraph = (ch.text.strip())
        news_p.append(paragraph)
 
 #adding variable to dictionary    
    mars_data['article'] = news_p[0]

    url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(url)


    browser.click_link_by_partial_text('FULL IMAGE')
    time.sleep(10)
    html = browser.html
    img_soup = BeautifulSoup(html, 'html.parser')
    #browser.is_element_present_by_css("ul.item_list li.slide", wait_time=1) ## this was just added, used to wait
    featured_img_url = img_soup.find('img', class_ = 'fancybox-image')
    featured_img_url = featured_img_url.get('src')
    featured_img_url = 'https://www.jpl.nasa.gov' + featured_img_url

    mars_data['Featured_Image'] = featured_img_url
    

    url = "https://twitter.com/marswxreport?lang=en"
    browser.visit(url)

    html = browser.html
    weather_soup = BeautifulSoup(html, 'html.parser')

    weather = weather_soup.findAll('p', class_ ='TweetTextSize')

    for ch in weather:
    #     print(ch.text)
        if 'Sol' in ch.text:
            latest_weather = ch.text
            break

    mars_data['Latest_Weather'] = latest_weather


    url = 'https://space-facts.com/mars/'
    tables = pd.read_html(url)
    df = tables[0]
    df.columns = ['Label', 'Measurement']
    df.set_index('Label', inplace=True)
    mars_data['Table_info'] = df.to_html()
    #adding table to dictionary 

    url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(url)


    browser.click_link_by_partial_text('FULL IMAGE')
    time.sleep(5)
    html = browser.html
    img_soup = BeautifulSoup(html, 'html.parser')
    featured_img_url = img_soup.find('img', class_ = 'fancybox-image')
    #print(featured_img_url)
    featured_img_url = featured_img_url.get('src')
    featured_img_url = 'https://www.jpl.nasa.gov' + featured_img_url
    #add JPL image to dictionary 
    mars_data['Featured_JPL_Image'] = featured_img_url



    hemisphere_image_urls = []
    url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(url)

    texts = ['Cerberus Hemisphere Enhanced', 'Schiaparelli Hemisphere Enhanced', 'Syrtis Major Hemisphere Enhanced', 'Valles Marineris Hemisphere Enhanced']
    for text in texts:
        browser.click_link_by_partial_text(text)
        html = browser.html
        soup = BeautifulSoup(html, 'html.parser')
        image_url = soup.select_one('div.downloads a')['href']
        image_title = soup.select_one('section.block h2.title').text
        new_dict = {}
        new_dict['img_url'] = image_url
        new_dict['title'] = image_title
        hemisphere_image_urls.append(new_dict)
        browser.back()
        #add image and title to Mars dict
        ##### test if this works below 
        mars_data[image_title] = image_url

    #hemisphere_image_urls

    return mars_data

#next 