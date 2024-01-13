# React + TypeScript + SASS

This is a Portfolio Project for Nikoloz Macharahvili. I will be using ReactJS, TypeScript and SASS to create a stock market API. I do not have a backend so I will be generating everything on the front end.

## I will write the documentation for the long 2-3-+ month project as follows

My goal is to create a Stock-Market API, and write the documentation for it here. The steps I took to create this project will be all here, I will be using chatGPT 3.5 for best-practices and code where I fall short.

### The Goal and Steps

So my goal is to create a stock-market API and in here I will write steps for EverDay.

#### Day 1

Goal: Create a Project with Vite + TypeScript. Create data for 10 stocks. Chart them using React Re-Charts Library and create cards for each stock.

Summary of Day 1: Okay so day 1 is complete, spent about 4 hours on the project.
What I did: I basically got a list of stocks with specific formatting from chatGPT and displayed it in a chart. Also made a card, so that each graph is displayed in a card.
Also added the bull icon in the middle of the card, looks cool, learned from John Smilga. Anyway I did not use chatGPT for code except for 1-2 places, seems like I forgot some stuff, but overall todays operation of "read and write" is done. And Im glad. Might add icons later to the card for money, title and sub-title.

Some problems I ran into:
I do not know recharts that well im studying it now, but display the chart was definitely a problem. Also styling the chart and centering it was a problem. I needed to use a margin-left: - 1 hack to center it correctly.
I used definite widths on the card since I want it to look that way, if it grows it will distort it.

### Day 2

Worked on implementing real-time-update, and got into an infinite loop problem, solved it but its still iffy. also redesigned the card

### Day 3

Today I will be installing SASS and setting up context and reducers

### Day 4-5

Encountered a problem, because I receive 3 data objects for each stock, and their time was in the past, so had to figure out a formula to generate past 3 times with 15 second lapses, but did it :)

### Day 6

Install react-router-dom@6 and configured it. Projects Looking nice with a capital N.

### Day 7

Kind of a slow day, focused on other things, but got 10 different shades of red, and changed the card and fixed the modal

### Day 8 Resting

### Day 9

Reformatted and upgraded the code, Also created a single page with a chart and a button back home. This is a splendid start

### Day 10

Slider added to the SinglePage, Slick Slider. And Made it responsive
