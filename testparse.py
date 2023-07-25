import urllib.request
from bs4 import BeautifulSoup

def googlepars(case,all):
    cc = case.encode("utf-8")
    cc= str(cc)
    cc = cc.replace("'","").replace('\\x','%').replace(' ','+').title()
    url = f'https://google.ru/search?q={cc}'
    request = urllib.request.Request(url)
    request.add_header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36')
    raw_response = urllib.request.urlopen(request).read()
    html = raw_response.decode("utf-8")
    soup = BeautifulSoup(html, 'html.parser')
    divs = soup.select("#search div.g")
    for div in divs:
        results = div.select("a")
        res=div.select('h3')
        if (len(results) >= 1):
            url = {}
            try:
                h3 = res[0]
                ur = results[0].get("href")
                if h3.get_text() != 'Картинки' and not ur in ('/search?q=',None):
                    url[h3.get_text()] = ur
                    all.append(url)
            except:
                h3 = case
                try:
                    ur = results[0].get("href")
                except:
                    ur = None
                if not ur in ('/search?q=',None):
                    url[h3] = ur
                    all.append(url)



