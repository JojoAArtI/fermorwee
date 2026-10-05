# 01. Company Research: Fermor

## 1. The facts

| Item | Detail |
|------|--------|
| Legal entity | Fermor Technologies Pvt. Ltd., registered in India |
| Website | https://fermor.in (Next.js App Router on Vercel, `lang="en-IN"`) |
| Page title | "Fermor — Smart financial decisions for India" |
| Meta description | "Clarity for every financial decision. Free tools, insights and calculators that help you understand, plan and grow your money, built for India." |
| Social | X: [@fermor_in](https://twitter.com/fermor_in). The footer also shows LinkedIn, Threads and YouTube icons. |
| Contact | fermor.in.contact@gmail.com, "typically respond within 2 business days" |
| Regulatory status | Not a SEBI-registered investment adviser. All tools are "educational and informational". |
| Business model | Advertising (Google AdSense is installed) and affiliate partnerships. Every calculator is free. An account is optional. |
| Team (self-described) | "A small team of engineers and finance enthusiasts who were tired of having to reverse-engineer their own loan amortization schedules from bank PDFs." |
| Public footprint | Very small. Web searches for the company, founders or funding returned nothing. The website is the main source. |

> In the brief, Fermor describes itself as "building a better way for people to understand, act and grow financially" and "focused on making finance simpler, clearer and easier to use."

## 2. What Fermor offers today

Fermor is two things at once. One is live; the other is still a promise.

### 2a. Live: a free finance toolkit and content library

From the sitemap (2,980 URLs):

| Area | Size | Notes |
|------|------|-------|
| `/calculators` | **158 calculators** | 6 categories: Investing & Wealth (31), Tax (26), Loans & Debt (55), Retirement & Fixed Income (19), Tools & Math (16), Others / salary (11) |
| `/mutual-funds` | **~2,500 pages**, 2,472 funds | Every AMFI-registered scheme. Pages per fund and per AMC. 1Y/3Y/5Y returns, risk, category filters. Updated daily from AMFI. |
| `/tax` | 45 pages | "Income tax on ₹X lakh salary" for 25 salary levels (₹3L to ₹100L), plus city pages (Bangalore, Mumbai, Delhi, Pune and 18 more) |
| `/blogs` | 46 articles | Long-form explainers (11 to 15 min reads, 14 to 21 FAQs each). Some in Hindi, Bengali, Marathi, Telugu, Punjabi, Nepali, Urdu. |
| `/gdp` | 197 pages | GDP by country (SEO pages) |
| `/credit-cards`, `/regulatory-updates` | 1 each | Comparison and regulatory feed |
| CA Portal ("For CAs") | — | "Generate branded Tax Optimization Reports for your mutual fund and SIP clients." A B2B angle for CAs and financial advisers. |

Most-linked calculators (header, footer, About page): SIP, EMI, Compound Interest, Home Loan, FD, PPF, Lumpsum, Income Tax, Gratuity, SWP, NPS, Mortgage, Car Loan, GST, Old vs New Tax Regime, HRA, In-Hand Salary, Goal Planning.

India-specific calculators that matter for the homepage story: 8th Pay Commission, Old vs New Tax Regime, Section 80C/80D, HRA, CTC, In-Hand Salary, EPF/VPF/PPF/NPS/SSY/SCSS/KVP/NSC, Stamp Duty (state-wise), Gold Loan, SBI/HDFC/ICICI Home Loan.

**What a calculator page looks like** (`/calculators/sip-calculator`): inputs with sliders on the left, a donut chart and a "Maturity Amount ₹56,00,897" bar on the right, a year-by-year growth schedule, a "Save your results" email capture, a "For CAs" cross-sell, and then a long explainer ("What is a SIP?", "How is SIP return calculated?", formula, FAQs). The math really is shown.

### 2b. Coming: the Fermor app (waitlist)

The homepage sells an app that is not public yet. The hero CTA is "Waiting list", and the App Store and Google Play badges link to `#`. Product names from the nav and homepage:

| Product | What the homepage says |
|---------|------------------------|
| **Ask** | "Get clear, personalized answers about your money, grounded in your financial data in seconds." AI chat. Sample prompts: "Where is my money going?", "How can I save more?", "My net worth trend". |
| **Portfolio** | "Understand your money better": one view of investments, spending and savings. Mock: monthly cash flow ₹82,000, spending by category. |
| **Market** | Stocks, mutual funds and ETFs. Mock: HDFC Bank, SBI, Maruti Suzuki tickers, a ₹500 monthly SIP "Invest Now" card. |
| **Forecast** | "Model scenarios from market shifts to life goals." Mock: ₹53,00,000 today to ₹1,64,60,996 in 10 years. |
| **Financial health score** | "78 / 100" with Emergency fund, Savings rate, Debt health and Investment diversification. "Get a free financial health check." |
| **Stay ahead / news** | "Timely updates on your investments, markets and personal finances." |
| **ACT** | In the nav only. No description anywhere. Possibly the "act" step of understand, act, grow. |
| **For Kids** | In the nav only. No page yet (`/kids` and `/for-kids` return 404). |

**Takeaway:** the strongest proof of Fermor's promise is the live toolkit, not the app mockups. The new homepage should lead with what works today and present the app as where it goes next.

## 3. Who Fermor is for

The site gives the audience away: Indian rupee formatting (₹12,48,230), lakh and crore, the tax regimes, PF, PPF, HRA, CTC, Indian banks, regional languages, and "Mobile-first: most Indians are on phones".

### Primary: salaried urban Indians, 22 to 40

| Persona | Situation | Decision they face | Fermor tools that answer it |
|---------|-----------|--------------------|-----------------------------|
| **Aarav, 24, first job in Bengaluru** | ₹9L CTC, no investments, confused by payslip | "What is my real in-hand? Should I start a SIP? Old or new regime?" | CTC, In-Hand Salary, SIP, Old vs New Regime |
| **Meera, 31, planning a home** | Dual income, saving for a down payment | "How much loan can we afford? Rent or buy?" | Home Loan Eligibility, EMI, Rent vs Buy, Stamp Duty |
| **Rohit, 36, has some investments** | SIPs, FD, EPF, a car loan | "Am I on track for retirement? Should I prepay the loan?" | Retirement Corpus, Loan Prepayment, FIRE, Portfolio Return |
| **Sunita, 52, government employee** | Pension questions, near retirement | "What will the 8th Pay Commission change? Where do I park my gratuity?" | 8th Pay Commission, Gratuity, SCSS, Pension, FD Laddering |

### Secondary

- **CAs and financial advisers**: the CA Portal, branded client reports.
- **Parents**: "For Kids" (planned), plus Sukanya Samriddhi (SSY) and Child Education Planner already exist.
- **Searchers who arrive on one page** from Google ("income tax on 12 lakh salary", "indane gas booking number"). Most traffic arrives on inner pages, not the homepage. So the homepage is for people who already met Fermor once and came back to see what it is. It needs to explain the whole, fast.

### What these people share

- They don't trust bank websites ("designed to sell you products").
- They are tired of ads and dark patterns.
- They want the number, but they also want to see *why* it is that number.
- They are on phones.

## 4. Positioning

**Category:** a personal finance clarity platform for India. Calculators and plain analysis today; a money app tomorrow.

**Competitor set** (none named on the site; this is my own read of the market):

| Competitor | What they are | How Fermor differs |
|------------|---------------|--------------------|
| Groww, Zerodha, INDmoney | Brokers and investment apps that also have calculators | They want the transaction. Fermor's calculators come first and are neutral. |
| ET Money, Paisabazaar, BankBazaar | Aggregators and lead generation | Their tools are funnels to a product. |
| ClearTax | Tax filing | Tax only. |
| Bank calculator pages | Sales tools | Hide the math, push their own products. |

**Fermor's position:** *the honest calculator.* "Show the full math, not just the answer." This is the line to build the homepage on.

## 5. Principles the company wrote itself (About page)

1. Show the full math, not just the answer.
2. No login wall on any calculator. An account is optional, only to save your results.
3. Ads and affiliate links are always clearly labeled, never disguised as neutral advice.
4. Transparent methodology on every tool.
5. Mobile-first: most Indians are on phones.

Also: "Every calculator's math runs entirely in your browser: the numbers you type in are never sent to our servers just to get a result."

These are better homepage material than anything on the current homepage.

## 6. Voice: how Fermor writes

Lines from the site that set the tone:

- "Fermor runs the math behind everyday money decisions."
- "Start with the numbers you already know, then move one input at a time and watch what it does to the result."
- "The tools show you the arithmetic and the trade-offs; the decision, and any advice you want on it, stays with you and your adviser."
- "Start small. Build big."
- "Let time do the heavy lifting."
- "Know where you stand."

**Voice traits:** plain, specific, calm, slightly dry, honest about limits. It uses numbers, not adjectives. It treats the reader as smart. It never promises returns.

**Off-voice lines on the current homepage** (avoid these): "Build your wealth with Fermor" (generic), "so, what are you looking to invest in?" (lowercase, chatty, a different voice), "Bring it all together" (vague).

## 7. Compliance must-haves

Every page needs the following, because Fermor is not SEBI-registered:

- Footer disclosure: "Fermor Technologies Pvt. Ltd. is registered in India and operates fermor.in, a financial calculator and education platform for Indian users. Fermor is not a SEBI-registered investment adviser and does not provide personalized financial, investment, or tax advice. All calculators, content, and tools on this platform are provided for educational and informational purposes only; individual results may vary."
- A short line near any calculator output: "Results are indicative. Not financial advice."
- Market mockups need "Illustrative" labels. Don't show "Invest Now" as if it is live.
- Any return figure needs its assumption next to it ("at 12% p.a. expected return").
- The OG description says "no ads" but AdSense is installed and the About page says the site is ad-supported. Don't repeat the "no ads" claim. Use "no paywall, no login wall" instead.

## 8. Content I can use on the new homepage (real, not invented)

- **Counts:** 158 calculators. 2,472 mutual funds tracked daily. 25 salary-level tax pages. 22 city tax pages. 46 long-form articles. Articles in 7 Indian languages.
- **Real recent articles** (September 2026): "Sensex Nifty Crash September 2026: 7 Straight Weekly Losses", "UPI Charges Above Rs 2,000: New MDR Rule Explained", "Bank Strike September 28-30, 2026: 5 Days Banks Closed, What Works", "PM-KISAN: Eligibility, eKYC, Status", "Section 87A Rebate: Limits and Marginal Relief".
- **The five FAQs** from the current homepage. They are well written. Keep them.
- **Real calculator defaults** from the SIP page: ₹25,000/month, 12% p.a., 10 years, which gives ₹30.00L invested, ₹26.01L returns, ₹56.01L total, a 1.87x multiplier.

## 9. Open questions (I can't answer these from the site)

- What exactly is **ACT**? I'll treat it as the "act" step (Invest / Market) unless told otherwise.
- Launch timing for the app. Use "Join the waitlist" and avoid dates.
- Real social URLs for LinkedIn, Threads and YouTube. Use `#` placeholders and flag them in the README.
