import fs from 'fs'
import cors from 'cors'
import puppeteer from 'puppeteer'
import browser from 'puppeteer'
import express from 'express'

const PORT = 8000
const app = express()
app.use(express.static("public"));
app.use(cors());

app.get('/', function(req, res) {
    res.json('this is mine')
})

const url = 'https://www.amazon.com/gp/bestsellers/?ref_=nav_em_cs_bestsellers_0_1_1_2'
app.get('/results', (req, res) => {

    const main = async () => {
        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage()
        await page.goto(url)
        
        const amazonData = await page.evaluate(() => {
            const amazonProd = Array.from(document.querySelectorAll(".a-carousel-card"))
            
            const data = amazonProd.map((prod) => ({
                productImage: prod.querySelector('img').getAttribute('src'),
                productName: prod.querySelector('img').getAttribute('alt'),
                productLink: prod.querySelector('a').getAttribute('href'),
                
            }))
            return data
        })
        
        browser.close()
        
        res.json(amazonData);

        // fs.writeFile('data.json', JSON.stringify(amazonData), (err) => {
        //     if(err) throw err
        //     console.log('Successfully saved')
        // })
    }
    main()
})


app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
 });