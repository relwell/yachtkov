# Yachtkov

A Yacht Rock song title generator.

## Markovify

We use it. Learn more about it [here](https://github.com/jsvine/markovify).

## Yacht Rock

The [Beyond Yacht Rock](http://yachtrock.com) rates Yacht Rock
songs on the Yachstky Scale, invented by Gene Yachstky to get to the
heart of what is quintessential Yacht Rock. You can see all
current ratings at [Yacht or Nyacht](http://yachtornyacht.com).

## How it Works

We take all the songs and generate hidden markov models, and improve
weighting and frequency of terms by multiplying the titles by their Yachstky
scores. We only include songs that have a >50 rating on the scale.

A song with a score of 50.01 will appear in the training material 50 times.
A song with a score of 100 will appear 100 times.

Clearly there are a bunch of ways to tune this. But this is all just for
a little fun so give me a damned break.
