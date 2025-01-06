import puppeteer from "puppeteer"
import axios from "axios"
let regex = /https:\/\/www\.instagram\.com\/[a-zA-Z0-9._]+\/[a-zA-Z]+\/[A-Za-z0-9_-]+\/\?igsh=[A-Za-z0-9]+|https:\/\/www\.instagram\.com\/(p|reel)\/[A-Za-z0-9_-]+\/\?igsh=[A-Za-z0-9_-]+|https:\/\/www\.instagram\.com\/stories\/[A-Za-z0-9._]+\/\d+\?utm_source=[A-Za-z0-9_]+&igsh=[A-Za-z0-9=]+/i
let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        if (!args[0]) return m.reply(`Masukan Urls!\n\nContoh:\n${usedPrefix + command} https://www.instagram.com/p/Cq8o8QZupaE/?igshid=YmMyMTA2M2Y=`)
        let isLink = args[0].match(regex)
        if (!isLink && !/instagram-download/i.test(command)) return m.reply("Itu bukan link instagram!")
        await global.loading(m, conn)
        if (/instagram-download/i.test(command)) {
            await conn.sendFile(m.chat, args[0], "", "", m)
            return
        }
        let data
        if (/storie/i.test(args[0])) {
            let req = await axios.get(global.API("https://api.lolhuman.xyz", "/api/igstory/", args[0].replace(/http:\/\/|https:\/\//gi, "").split("/")[2], null, "apikey"))
            data = await (req.data.result)
        } else {
            data = await getInstagramReel(args[0])
        }
        if (!data.length > 1) return m.reply(data.message)
        if (data.length > 1) {
            let list = data.map((v, i) => {
                return [`${usedPrefix}instagram-download ${v}`, (i + 1).toString(), (i + 1).toString()]
            })
            await conn.textList(m.chat, `Terdapat *${data.length} Result* \nSilahkan Mana Result Yang Ingin Kamu Download.`, data[0], list, m, { noList: true })
        } else {
            await conn.sendFile(m.chat, data[0], '', '', m)
        }
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['instagram']
handler.tags = ['downloader']
handler.command = /^(instagram(mp4|dl|-download)?|ig(mp4|dl)?)$/i
handler.limit = true
export default handler

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.substr(1)
}

const getInstagramReel = async (instagramReelURL) => {
    let browser
    try {
        browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            headless: "new"
        })
        const page = await browser.newPage()

        const userAgents = [
            "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
            "Mozilla/5.0 (Windows NT 10.0 Win64 x64 rv:89.0) Gecko/20100101 Firefox/89.0",
            "Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.48",
        ]

        const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)]
        console.log("UserAgent : " + randomUserAgent)
        await page.setUserAgent(randomUserAgent)

        const WebsiteURL = "https://snapinsta.app"

        await page.goto(WebsiteURL, {
            waitUntil: "networkidle2", timeout: 60000
        })

        await page.waitForSelector("#url")

        await page.$eval('input[name="url"]', (el, value) => (el.value = value), instagramReelURL)

        await page.waitForSelector('button[type="submit"]')
        await page.$eval('button[type="submit"]', (button) => button.click())

        await page.waitForSelector(".download-bottom")

        const downloadLinks = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('.download-bottom a'))
            return links.map(link => link.href)
        })
        return downloadLinks ? downloadLinks : []
    } catch (error) {
        console.error(error)
    } finally {
        if (browser) {
            await browser.close()
        }
    }
}

const getInstagramStories = async (instagramStoriesURL) => {
    let browser
    let page
    let downloadLinks = []
    try {
        browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            headless: "new"
        })
        page = await browser.newPage()

        const userAgents = [
            "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
            "Mozilla/5.0 (Windows NT 10.0 Win64 x64 rv:89.0) Gecko/20100101 Firefox/89.0",
            "Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.48",
        ]

        const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)]
        console.log("UserAgent : " + randomUserAgent)
        await page.setUserAgent(randomUserAgent)

        const WebsiteURL = "https://fastdl.app/story-saver"

        await page.goto(WebsiteURL, {
            waitUntil: "networkidle2", timeout: 60000
        })

        await page.waitForSelector("#search-form-input")

        await page.$eval("#search-form-input", (el, value) => {
            el.value = value
            el.dispatchEvent(new Event("input", {
                bubbles: true
            }))
        }, instagramStoriesURL)

        await page.click(".search-form__button")

        await page.waitForSelector(".output-list__item", {
            timeout: 60000
        })

        const downloadLinks = await page.$$eval(
            ".button.button--filled.button__download",
            (elements) => elements.map((el) => el.href)
        )

        return downloadLinks
    } catch (error) {
        if (page) {
            await page.screenshot({
                path: "error_screenshot.png"
            })
        }
        console.error(error)
    } finally {
        if (browser) {
            await browser.close()
        }
    }
}