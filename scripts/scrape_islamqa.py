import requests
import json
from bs4 import BeautifulSoup

import aiohttp
import asyncio

async def fetch(session, url):
    try:
        async with session.get(url) as response:
            # Check if the response status code is 200 (OK)
            if response.status == 200:
                resp = await response.text(), url
            else:
                # print(f"Error {response.status} for URL: {url}")
                resp = None, None
    except aiohttp.ClientError as e:
        print(f"Client error {e} for URL: {url}")
        resp = None, None
    except asyncio.TimeoutError:
        print(f"Timeout error for URL: {url}")
        resp = None, None
    except Exception as e:
        print(f"Failed to get response for URL: {url} due to {e}")
        resp = None, None
    return resp


async def main(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]
        completed_tasks = await asyncio.gather(*tasks)
        ret = []
        for html, url in completed_tasks:
            if (not html):
                continue
            resp = parse_qa(html, url)
            if resp:
                ret.append(resp)
        return ret
    
async def run_async_tasks(urls):
    task = asyncio.ensure_future(main(urls))
    try:
        responses = await task
    except (SyntaxError, RuntimeError):
        loop = asyncio.get_event_loop()
        responses = loop.run_until_complete(task)
    return responses

def parse_qa(html,url):
    soup = BeautifulSoup(html, 'html.parser')
    question_container = soup.find('section', class_='single_fatwa__question')
    answer_container = soup.find('div', class_='content')
    if question_container and answer_container:
        question = question_container.get_text(separator=' ', strip=True)
        answer = answer_container.get_text(separator = ' ', strip=True)
        return {
            'Question': question,
            'Answer': answer,
            'Source': url,
            'Type': 'QA',
        }
    else:
        # print(f"Missing details for: {url}")    
        return None

async def run():
    islam_qa = []
    last_num = 224475
    max_num = 500749
    part = 9
    for i in range(224475, max_num+1):
        if i % 100 == 0 or i == max_num:
            print("Sent requests from", last_num, "to", i)
            urls = [f'https://islamqa.info/en/answers/{i}' for i in range(last_num, i)]
            last_num = i
            responses = await run_async_tasks(urls)
            print(f"Got {len(responses)} responses from batch and {len(islam_qa)} responses in total")
            islam_qa.extend(responses)
        if len(islam_qa) >= 200:
            with open(f"./islam_qa_part{part}.json", 'w') as file:
                try:
                    json.dump(islam_qa, file, indent=4)
                    print("printed part ", part)
                    islam_qa = []
                    part += 1
                except:
                    print("Failed to write file")
    with open(f"./islam_qa_part{part}.json", 'w') as file:
        json.dump(islam_qa, file, indent=4)
        print("printed part ", part)    

asyncio.run(run())