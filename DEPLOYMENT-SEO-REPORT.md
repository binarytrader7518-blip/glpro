# GLPro — Deployment, SEO & Verification Report

Site: https://eng-glpro.vercel.app · Built 2026-11-25 · Static HTML for Vercel (no build step).

## Deploy
1. Upload the folder contents (index.html at root) to the Vercel project for eng-glpro.vercel.app, or drag the folder into Vercel → New Project. Framework preset: **Other**, no build command, output directory = root.
2. `vercel.json` handles `/order` (rewrite to order.html) and the server-side 302 redirects `/go/2`, `/go/3`, `/go/6` → your affiliate URL. Any other `/go/...` returns 404 (no open redirect).
3. After deploy, check: `/`, `/order?package=6`, `/go/6` (should 302 to tryglpro.com with `aff_id=332510`), `/go/9` (should 404), `/sitemap.xml`, `/robots.txt`, `/key.txt`.
4. Run `node scripts/indexnow.mjs --all` once from this folder (Node 18+), then `node scripts/indexnow.mjs` after each later deploy. It verifies key.txt live, submits only changed/new/deleted sitemap URLs, retries on errors and logs the response code. (scripts/ and package.json are excluded from the deployed site by .vercelignore.)

## Affiliate routing
- Every buy button site-wide → `/order?package=2|3|6` (own domain). `/order` is `noindex, follow`.
- Buy Now buttons on order.html → exact affiliate URL `https://tryglpro.com/f/szs6tw?aff_id=332510` with `rel="sponsored nofollow noopener"`.
- `/go/2|3|6` → same URL via HTTP 302 (only one affiliate URL was supplied, so all packages share it).

## SEO titles & descriptions (all validated: titles ≤55, descriptions ≤155, all unique)

| URL | Title | Chars | Description chars | Primary keyword |
|---|---|---|---|---|
| https://eng-glpro.vercel.app/404.html | Page Not Found | GLPro | 22 | 104 | article/legal topic |
| https://eng-glpro.vercel.app/affiliate-disclosure.html | GLPro | Affiliate Disclosure | 28 | 115 | article/legal topic |
| https://eng-glpro.vercel.app/alternatives.html | GLPro Alternatives | Compare Your Options | 41 | 145 | GLPro alternatives |
| https://eng-glpro.vercel.app/benefits.html | GLPro | Benefits for Healthy Blood Sugar | 40 | 141 | GLPro benefits |
| https://eng-glpro.vercel.app/blog/bitter-melon-gymnema-banaba.html | Bitter Melon, Gymnema & Banaba Explained | GLPro | 48 | 135 | article/legal topic |
| https://eng-glpro.vercel.app/blog/blood-sugar-supplements-and-medication.html | Blood Sugar Supplements & Medication Safety | GLPro | 51 | 133 | article/legal topic |
| https://eng-glpro.vercel.app/blog/chromium-guide.html | Chromium Picolinate Guide: Uses & Evidence | GLPro | 50 | 141 | article/legal topic |
| https://eng-glpro.vercel.app/blog/cinnamon-and-blood-sugar.html | Cinnamon and Blood Sugar: The Evidence | GLPro | 46 | 139 | article/legal topic |
| https://eng-glpro.vercel.app/blog/index.html | GLPro Blog | Blood Sugar Wellness Articles | 42 | 132 | blood sugar supplement articles |
| https://eng-glpro.vercel.app/blog/post-meal-blood-sugar-habits.html | 7 Habits for Steadier Post-Meal Blood Sugar | GLPro | 51 | 141 | article/legal topic |
| https://eng-glpro.vercel.app/blog/what-is-glp-1.html | What Is GLP-1? A Plain-English Guide | GLPro | 44 | 136 | article/legal topic |
| https://eng-glpro.vercel.app/disclaimer.html | GLPro | Supplement & Medical Disclaimer | 39 | 150 | article/legal topic |
| https://eng-glpro.vercel.app/faq.html | GLPro FAQ | Ingredients, Use & Shipping | 39 | 142 | GLPro FAQ / side effects |
| https://eng-glpro.vercel.app/focus-areas/daily-energy.html | GLPro | Steady Daily Energy Focus Area | 38 | 143 | article/legal topic |
| https://eng-glpro.vercel.app/focus-areas/healthy-glucose-levels.html | GLPro | Healthy Glucose Levels Focus Area | 41 | 136 | article/legal topic |
| https://eng-glpro.vercel.app/focus-areas/healthy-weight.html | GLPro | Healthy Weight Goals Focus Area | 39 | 136 | article/legal topic |
| https://eng-glpro.vercel.app/focus-areas/index.html | GLPro | Focus Areas for Metabolic Wellness | 42 | 121 | GLPro blood sugar support |
| https://eng-glpro.vercel.app/focus-areas/sugar-cravings.html | GLPro | Sugar Cravings Focus Area | 33 | 132 | article/legal topic |
| https://eng-glpro.vercel.app/how-it-works.html | GLPro | How It Works & How to Use It | 36 | 145 | how does GLPro work |
| https://eng-glpro.vercel.app/ | GLPro | Blood Sugar Support Supplement | 38 | 155 | GLPro / GLPro blood sugar |
| https://eng-glpro.vercel.app/order | Order GLPro | Choose Your Package | 33 | 117 | article/legal topic |
| https://eng-glpro.vercel.app/price.html | GLPro Price | Packages, Cost & Shipping | 39 | 144 | GLPro price / packages / discount |
| https://eng-glpro.vercel.app/privacy-policy.html | GLPro | Privacy Policy | 22 | 136 | article/legal topic |
| https://eng-glpro.vercel.app/product-overview.html | GLPro | What Is It? Ingredients & Overview | 42 | 137 | what is GLPro / GLPro ingredients |
| https://eng-glpro.vercel.app/product-review.html | GLPro Review | Is It Legit? Honest Verdict | 42 | 146 | GLPro review / is GLPro legit / complaints |
| https://eng-glpro.vercel.app/pros-and-cons.html | GLPro Pros and Cons | Balanced Evaluation | 41 | 141 | GLPro pros and cons |
| https://eng-glpro.vercel.app/reviews.html | GLPro Reviews | Customer Testimonials | 37 | 130 | GLPro reviews / customer reviews |
| https://eng-glpro.vercel.app/terms.html | GLPro | Terms and Conditions | 28 | 131 | article/legal topic |
| https://eng-glpro.vercel.app/where-to-buy.html | Where to Buy GLPro | Official Order Page | 40 | 146 | where to buy GLPro / buy GLPro online |

## Keyword map (no search-volume data invented)

| Keyword | Target page | Intent | Priority |
|---|---|---|---|
| Buy GLPro / Buy GLPro online | /where-to-buy.html, /order | Transactional | High |
| Where to buy GLPro | /where-to-buy.html | Transactional | High |
| GLPro price / best price / packages | /price.html | Commercial | High |
| GLPro discount / deals / coupon | /price.html (no fake coupons) | Commercial | Medium |
| GLPro official website | /where-to-buy.html (explains this is an independent site and links to the official order page) | Navigational | High |
| GLPro review / reviews | /product-review.html, /reviews.html | Commercial investigation | High |
| Is GLPro legit / scam or legit | /product-review.html | Commercial investigation | High |
| GLPro complaints | /product-review.html (complaints section), /reviews.html | Informational | Medium |
| Does GLPro work | /product-review.html, /how-it-works.html | Informational | High |
| GLPro pros and cons | /pros-and-cons.html | Commercial | Medium |
| GLPro ingredients | /product-overview.html | Informational | High |
| GLPro side effects | /faq.html, /blog/blood-sugar-supplements-and-medication.html | Informational | High |
| GLPro alternatives | /alternatives.html | Commercial | Medium |
| natural GLP-1 booster | /blog/what-is-glp-1.html | Informational | Medium |
| cinnamon / chromium / bitter melon blood sugar | matching blog articles | Informational | Medium |

Official-site wording: titles do **not** use "Official" because this is an independent affiliate site.

## Structured data
- Home, What Is It, Review, Price: `Product` with three `Offer`s (2/3/6 bottles, total package prices $158/$207/$294 USD, InStock, NewCondition, 60-day `MerchantReturnPolicy`, free-US-shipping `OfferShippingDetails` on the 6-bottle offer only, since shipping cost for 2/3 bottles isn't published).
- No `aggregateRating` or `Review` markup: the official seller page shows no rating or review count, and reseller testimonials can't support review markup. `offers` satisfies Google's Product requirement.
- `WebSite` (home), `BreadcrumbList` (all inner pages), `FAQPage` (FAQ page, all 14 Q&As visible), `Article` (6 blog posts).
- No `Organization` block: naming the site operator "GLPro" would imply it's the manufacturer, and no verified contact details exist.

## Scientific references (all URLs fetched and checked 2026-11-25)

| Agency / institution | Title | URL | Type | Ingredient / topic |
|---|---|---|---|---|
| NIH – National Center for Complementary and Integrative Health (NCCIH) | Diabetes and Dietary Supplements: What You Need To Know | https://www.nccih.nih.gov/health/diabetes-and-dietary-supplements | US Government Health Resource | Cinnamon, chromium, alpha lipoic acid, bitter melon, berberine |
| NIH – NCCIH | Cinnamon: Usefulness and Safety | https://www.nccih.nih.gov/health/cinnamon | US Government Health Resource | Cinnamon bark |
| NIH – Office of Dietary Supplements (ODS) | Chromium – Health Professional Fact Sheet | https://ods.od.nih.gov/factsheets/Chromium-HealthProfessional/ | NIH Fact Sheet | Chromium picolinate |
| NIDDK – LiverTox (NIH National Library of Medicine Bookshelf) | Bitter Melon | https://www.ncbi.nlm.nih.gov/books/NBK590483/ | Government Scientific Publication | Bitter melon |
| NIDDK – LiverTox (NIH National Library of Medicine Bookshelf) | Gymnema Sylvestre | https://www.ncbi.nlm.nih.gov/books/NBK610217/ | Government Scientific Publication | Gymnema sylvestre |
| NIDDK – LiverTox (NIH National Library of Medicine Bookshelf) | Alpha Lipoic Acid | https://www.ncbi.nlm.nih.gov/books/NBK591554/ | Government Scientific Publication | Alpha lipoic acid |
| NIDDK – National Institute of Diabetes and Digestive and Kidney Diseases | Insulin Resistance & Prediabetes | https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-diabetes/prediabetes-insulin-resistance | US Government Health Resource | Topic: insulin sensitivity |
| CDC – Centers for Disease Control and Prevention | Prediabetes – Your Chance to Prevent Type 2 Diabetes | https://www.cdc.gov/diabetes/prevention-type-2/prediabetes-prevent-type-2.html | US Government Health Resource | Topic: healthy blood sugar habits |
| FDA – U.S. Food and Drug Administration | Dietary Supplements | https://www.fda.gov/food/dietary-supplements | FDA Guidance | Topic: supplement regulation and safety |

## IndexNow

- API key: `04daf9994e9fc1a477657a22bcf1d730`
- Key file: https://eng-glpro.vercel.app/key.txt (file named exactly key.txt; contents = key only)
- Status: **Not verified live** (no outbound network from the build environment). Verify after deploy; the script refuses to submit until key.txt matches.

### Submission URLs (one per sitemap URL)

https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2F&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Fproduct-overview.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Fhow-it-works.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Fbenefits.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Ffocus-areas%2Findex.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Ffocus-areas%2Fhealthy-glucose-levels.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Ffocus-areas%2Fsugar-cravings.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Ffocus-areas%2Fdaily-energy.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Ffocus-areas%2Fhealthy-weight.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Freviews.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Ffaq.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Fblog%2Findex.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Fblog%2Fwhat-is-glp-1.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Fblog%2Fcinnamon-and-blood-sugar.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Fblog%2Fpost-meal-blood-sugar-habits.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Fblog%2Fchromium-guide.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Fblog%2Fbitter-melon-gymnema-banaba.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Fblog%2Fblood-sugar-supplements-and-medication.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Fproduct-review.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Fprice.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Fwhere-to-buy.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Fpros-and-cons.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Falternatives.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Faffiliate-disclosure.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Fdisclaimer.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Fprivacy-policy.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt
https://api.indexnow.org/indexnow?url=https%3A%2F%2Feng-glpro.vercel.app%2Fterms.html&key=04daf9994e9fc1a477657a22bcf1d730&keyLocation=https%3A%2F%2Feng-glpro.vercel.app%2Fkey.txt

## Bing Webmaster Tools checklist
1. bing.com/webmasters → Add site → `https://eng-glpro.vercel.app/` (import from Google Search Console, or use the HTML meta-tag method; send me the tag and I'll add it to every page head).
2. Sitemaps → submit `https://eng-glpro.vercel.app/sitemap.xml`.
3. URL Submission → paste the list from the chat (27 URLs).
4. URL Inspection → check `/`, `/product-review.html`, `/price.html`.
5. IndexNow → after running the script, confirm received URLs under the IndexNow report.
6. Monitor Search Performance (impressions, clicks, queries) and Crawl/Indexing errors weekly.

Nothing has been submitted, verified or indexed yet. An accepted IndexNow submission means received, not indexed.

## Known limitations
- **Images:** the sales sites' original bottle files couldn't be downloaded here, so every product image is built from the two GLPro photos you uploaded. The single bottle was cut out of your 2-bottle photo unchanged; bundle images repeat that same cut-out. Nothing on the label was redrawn.
- **No lifestyle/model photos:** no image-generation tool was available, and an AI-generated person holding the bottle would also risk distorting the label. Ingredient art and blog thumbnails are original SVG illustrations, not photos.
- **Cross-promotion cards** use coloured monogram tiles rather than product photos, since the other sites' images couldn't be downloaded.
- **Ingredients:** the two sales pages list different full formulas and no amounts; the site features the 7 ingredients both pages share and names the rest as listed per source.
- **Directions:** no official dose was published. The label shows 30 capsules and the seller sells each bottle as a 30-day supply, while one reseller page says two capsules daily, which doesn't fit 30 capsules for 30 days. The site says to follow the label.
- **Rating:** no 4.8/5 aggregate rating is shown anywhere, because no genuine rating exists to support it.
- **Contact details:** none published by the seller, so no contact section was added.
- **Countdown:** the seller's timer resets per visit, so no countdown was added.
