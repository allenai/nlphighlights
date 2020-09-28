---
title: "Get To The Point: Summarization with Pointer-Generator Networks"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: "023"
tags: []
description: "ACL 2017 paper by Abigail See, Peter Liu, and Chris Manning. Matt presents the paper, describing the task (summarization on CNN/Daily Mail), the model (the standard copy + generate model that people are using these days, plus a nice coverage loss term), and the results (can't beat the extractive baseline, but coming close). It's a nice paper - very well written, interesting discussion section. https://www.semanticscholar.org/paper/Get-To-The-Point-Summarization-with-Pointer-Genera-See-Liu/13db673d09f546698e0bfb6687beeb5345f81ad9 Abigail also has a very nice blog post where she describes her work in a less formal tone than the paper: http://www.abigailsee.com/2017/04/16/taming-rnns-for-better-summarization.html"
type: episode
---

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:12">

Okay. Today's paper is titled: Get To The Point: Summarization with Pointer-Generator Networks. It's
paper written by Abigail See, Peter Liu and Christopher Manning at Stanford University in Google
Brain. This paper looks at the task of summarization, which is a given some, typically a news
article is where you see this used most, but you could imagine it for a lot of other things, given
some input texts such as a news article generate some summarization of it, which could be a headline
or it could be a few sentence summary, like a paragraph. And an important distinction that people
make in summarization tasks is between extractive summarization and abstractive summarization where
extractive summarization means I'm extracting something from the input text and returning that as my
summary.

</turn>


<turn speaker="Matt Gardner" timestamp="01:02">

I don't have to generate anything new. I just have to pull out pieces of my input and return that
combined in some way, maybe, as the output of my, the thing that I'm using to summarize the inputs
abstractive summarization is more general in that you can, you're allowed to produce, to return
things in your summary that were not in the original document. So you can use different words to say
the same thing. And as you might expect, this is how humans summarize things most of the time. We
typically don't just pull out phrases from the original input text when we're summarizing say a
textbook or a scientific paper or talking about a paper on a podcast for instance.

</turn>


<turn speaker="Waleed Ammar" timestamp="01:45">

Right. But this is hard. So most summarization methods actually do extractive summarization cause
generating language is very hard. And there was a blog post by Yoav [Goldberg] bashing people about
proposing a naive method for doing generation.

</turn>


<turn speaker="Matt Gardner" timestamp="02:04">

Yeah. if you look at the, I guess this is a little teaser for later on in this episode, but the
baseline results for extractive summarization is you just take the first three sentences of the
article. So that they're actually looking at news articles and trying to summarize the news article.
And if you just take the first three sentences, you do better on their metrics than any other method
that's ever been proposed, basically. It's really hard to beat this baseline because as Waleed said,
language generation is hard. But instead of getting discouraged by how hard this is, they say, let's
see how much we can push on the abstractive part and see if we can at least get close to the
extractive baseline. Okay. So that's where we're coming with, this paper.

</turn>


<turn speaker="Matt Gardner" timestamp="02:51">

I will note here that I just really liked this paper. It's written really well. It was really nice
to read. It's formatted nicely, it even formats references correctly. It's figures are really nice
and clear and clean. It's just a nice paper. That's a really good example of a well-written paper.
So there you go. Okay, well now let's talk about the actual model that they use. So remember they're
trying to generate text, given some input. So you can imagine two very different kinds of things
that you might try to do. One is more on the extractive line except it's instead of extracting
individual, like instead of extracting whole sections of text, you can generate one word at a time
from the input document by copying something from the input document. This was introduced a year or
a few years ago in a paper called Pointer Networks.

</turn>


<turn speaker="Matt Gardner" timestamp="03:52">

And this paper builds on that and says, this is one option for generating something. And here in
this kind of a model, you run some encoder on the input document and then at every time step when
you're generating a word, you compute an attention over your input and sample from that attention
distribution or pick the max or something. And that attention distribution is basically your copy
probability. Which word should I copy from my input at each, at each time step? This is a pointer
network. A different idea is I can still use the same encoder on my input, maybe a biLSTM or stacked
biLSTM whatever I want to do. And then at each time step I have some vocabulary that I can generate
words from. And so given in my decoder from whatever hidden state, my decoder has, I compute a
probability distribution over my vocabulary and I generate a word from there.

</turn>


<turn speaker="Matt Gardner" timestamp="04:51">

And this is a generation or abstractive kind of model. What this paper does is a combination of the
two, and they call it a pointer-generator network. This is we should be clear, it's not a new idea.
A lot of people have done this in a lot of different tasks like semantic parsing. There are these
like copy plus generator pointer plus generator kind of models to generate logical forms given some
input. You see it all over the place these days. This is a paper applying this idea to
summarization. Their particular instantiation of this combination is they take as I said, some bi-
directional LSTM encoder on their input. And then at each step in the hidden state, they output a
generate probability, which is essentially a gate or a mixing parameter that tells you how much
should I, how much do I expect my model to copy right now? Or how much should I generate? And then
you compute these two different probability distributions, one over the words in your input and one
over the words and in your vocabulary. And you had just do a linear combination of these two
probability distributions using this mixing parameter that you've predicted. And that gives you a
final distribution over words that you're going to output.

</turn>


<turn speaker="Matt Gardner" timestamp="06:11">

And that's their pointer-generator model, this works pretty well. And they have just one little
extra tweak, which is a nice little idea. And it's a coverage mechanism. This doesn't change the
structure of the model at all, but it augments the loss function saying that if I'm assigning
attention to words in my input, either to copy from it or to use an attention weighted hidden state
for generating for my vocabulary. Anytime I compute an attention over my input I penalize looking at
the same place multiple times over multiple time steps. And they do this by keeping track over time
of all the attention that they've given to different tokens in the input. And then penalizing giving
new attention to things that have already gotten attention in previous time steps.

</turn>


<turn speaker="Matt Gardner" timestamp="07:09">

And it's a way of encouraging the model to not repeat itself, which previous models have suffered
from.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:17">

So this coverage mechanism works like a regularizer, which looks at the previous decision you'll
need for attention. And then you attention you're assigning and if you're picking the same word that
you picked several times before, it's gonna penalize you for doing this. So how does the additional
term exactly compute this penalty?

</turn>


<turn speaker="Matt Gardner" timestamp="07:43">

Yeah. It's actually kind of interesting how they get this to work. So they add a term to the loss
function that is a sum over all of the tokens in your input. And it's, you take the minimum of the
attention given to each token. And the sum of the previous attention that I've given it in previous
time steps. So what this means is the first step, this coverage loss is going to be zero because
I've never, because I'm doing a tokenwise min over all of my input tokens and the previous coverage,
the previous attention that I've given to it, the coverage value for each token is going to be zero.

</turn>


<turn speaker="Matt Gardner" timestamp="08:31">

And so the min of zero and any attention that I give this turn, this token time step is going to be
zero. So the first time I output something I covers loss zero. It gets interesting at the next step
and in future steps where now I take the attention that I assigned at the previous time step and I
add it to the coverage vector. So now if I've seen something before the, if I've paid attention to a
token before, it now has a higher coverage value. Now, if I assign probability mass to that same
token I'm taking the min of the coverage probability the previous attention that I've given to this
token and the current attention that I'm giving to this token. And that means that my loss is going
to be high because both of those values are high. If instead I assigned probability mass in my
attention to a token that has a low coverage vector that I haven't paid attention to before, I'm
taking the min of the low coverage vector and the high probability, the high current time step
attention and I'm going to get a low value. So I minimize this loss by choosing to attend to tokens
that I have not attended to in previous time steps. Does this make sense?

</turn>


<turn speaker="Waleed Ammar" timestamp="09:53">

It does make sense. And it seems like computing this on paper will be daunting because every time in
every time step you're selecting one of the two terms. And then if you select the aggregate, you
have to back propagate through all the previous steps which contributed to this aggregate value.

</turn>


<turn speaker="Matt Gardner" timestamp="10:11">

This is like, this would be like impossible to have implemented before the days of automatic
differentiation. Like this is why our modern deep learning tool kits are so nice because they let us
do these really interesting things that there's no way we could have done this before. It's just too
messy to actually do this yourself.

</turn>


<turn speaker="Matt Gardner" timestamp="10:30">

Okay. So that's how the model works. The way I read this was like a pretty standard pointer-
generator kind of network. This, these are things that I've seen before that I've implemented. And
so like, it seems pretty standard to me except for this coverage term, which was really pretty
interesting. And so I guess we'll just finish up by talking about the actual experiments that they
did. They used the CNN/Daily Mail dataset, which was released a couple of years ago by some folks at
Google they called this reading comprehension. It's a closed style reading comprehension task where
you're given a document, a news article from either CNN or from the Daily Mail with an accompanying
summary with one token removed. Or that token was typically an entity from the document. And then
the task in this reading comprehension dataset was to recover the entity that was pulled out. They
take this dataset and instead take the summary completely without any entity missing and try to
generate the summary from the document.

</turn>


<turn speaker="Matt Gardner" timestamp="11:34">

A minor point here is that Google originally anonymized the dataset, so all entities were replaced
with entity identifiers. There are some issues there because it was done automatically. And Danqi
Chen had an interesting analysis of this dataset. But this paper that we're looking at today said,
let's forget about this entity anonymization and only use the original text. And there's some nice
reasons to think that we should do it that way instead of using the anonymized version. So anyway,
they do this, given the input, they try to generate the summary, train the model to generate the
summary. I guess they had, let's see, almost 300,000 training pairs, about 13,000 validation and
about 11.5 thousand test pairs.

</turn>


<turn speaker="Matt Gardner" timestamp="12:28">

They evaluated after training on their data, they evaluated on the test set by using ROUGE and
METEOR metrics. These are common evaluation metrics in machine translation work where you have some
reference thing that was supposed to have been generated. And you want to compare an actual
generated thing to the reference. And you do this essentially by looking at overlaps of different
length N-grams between the generated thing and the reference thing. And METEOR is a metric that does
this in a parameterized way, tries to be a little fancier and better handle synonym kinds of things
instead of just strict over lap. And a ROUGE is one that's more looking just at strict overlap.

</turn>


<turn speaker="Matt Gardner" timestamp="13:16">

The upshot is they do better by several ROUGE points than any previous abstractive model and they do
comparatively to previous extractive models except for the baseline, which is just take the first
three sentences. So, as I said earlier, that's kind of a disappointing result that you can't beat
that really simple baseline, but it's still pretty nice that you can get really very close using
this abstractive approach. And the reason to be optimistic about the extractive approach is that
it's strictly more general. You can make more progress starting from this baseline than you can
from, Hey, let's take the first three sentences. It's not clear at all how to take that and do
interesting work with it. Whereas here we have a nice model that can do interesting things and maybe
we can push it and actually we're really close to the baseline so maybe we'll actually beat it
pretty soon.

</turn>


<turn speaker="Waleed Ammar" timestamp="14:07">

That's a very exciting results did the show any sample output from the model?

</turn>


<turn speaker="Matt Gardner" timestamp="14:12">

Ya, they did. the first figure on their paper has a document and outputs from previous like from the
baseline, let's just generate model from a pointer-generator network without a coverage penalty and
then their final model that has a coverage penalty and they show failure cases of different things.
Where if you're not copying, you have a hard time generating named entities and other rare words
this is, as you can imagine, a whole lot easier to generate from looking at your input document.
Then generating a rare token from a vocabulary. If you don't have coverage penalty, you are more
likely to repeat yourself and try to summarize the same things several times. Whereas their final
model has a pretty decent summary. It looks like it actually is pretty abstract extractive and that
the end result is basically three sentences that are just copied from different parts of the
document.

</turn>


<turn speaker="Matt Gardner" timestamp="15:11">

So that's what the model learns how to do. Which is kind of interesting. So like you could imagine
some penalties in future work trying to make this explicitly more abstractive and less overlap with
the actual document. I don't know how you would do that. But they also have some analysis at the
end. They have several pages of discussion which are pretty interesting showing how frequently there
are overlaps between various levels of N-grams and whole sentences. How often these are unique in
the summary versus in the original document. That is to say, I can look at each full sentence in my
summary and see if that sentence appears in the original documents for reference summaries,
summaries generated by humans. This almost never happens for the pointer-generator plus coverage
model. This happens about 30/35% of the time where a sentence in my output is identical to one in my
input.

</turn>


<turn speaker="Matt Gardner" timestamp="16:17">

And you get similar kinds of disparities in number of actual abstractive summarizations when you
look at shorter length sequences too. So unique four grams in reference summaries is like 20% are
actually copied from the input. So if you look at each four word sequence in my reference summary
generated by a human, only 20% of the time will I have seen that four word sequence in my input
document. But for the pointer-generator network that happens almost 90% of the time. So it does a
whole lot of copying whereas humans don't. And so this is a really interesting, like this to me is
like the hard part left in this task and it'll be interesting to see future work on this.

</turn>


<turn speaker="Waleed Ammar" timestamp="17:04">

Thank you for talking about this paper, Matt. Next time we'll talk about a paper titled: Improving
Hypernymy Detection with an Integrated Path-based and Distributional Method.

</turn>
