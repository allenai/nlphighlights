---
title: "Learning to Generate Reviews and Discovering Sentiment"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: "009"
tags: []
description: "https://www.semanticscholar.org/paper/Learning-to-Generate-Reviews-and-Discovering-Senti-Radford-Jozefowicz/664ec878de4b7170712baae4a7821fc2602bba25 https://blog.openai.com/unsupervised-sentiment-neuron/"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F324457433&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:13">

All right. Today's paper is Learning to Generate Reviews and Discovering Sentiment by Alec Radford,
Rafal Jozefowicz, Ilya Sutskever at open AI. This paper fits into a line of work on representation
learning for natural language text and their contribution here is showing that character level
language models can learn interesting representations that are useful by themselves for some
downstream tasks and there are a lot of caveats to that claim, but that's their high level point and
they showed this by taking a bunch of Amazon reviews, which you can imagine are generally pretty
polarized. Some of them, some people really like the products that they review. Some people really
don't. And so if you want to build a language model that can predict the next word, it's pretty
reasonable to think that the language model would have to encode something about the sentiment of
the review in order to predict what's going to come next.

</turn>


<turn speaker="Matt Gardner" timestamp="01:10">

If it should be predicting positive words or negative words or neutral words that are coming. And so
they train a character level language model for about a month and get a set of about 4,000 features
out of this language model or the language model in the end has 4,096 units. And then they use the
representations that come out of the language model to predict sentiment on a number of different
datasets. And they find that there's one particular neuron that when you're trying to classify
sentiment of these reviews that encodes essentially just sentiment, you can use just this one neuron
to get incredibly high accuracy on this task. And that if more generally you use a heavily
regularized just simple model on top of the features that you get out of this language model. You
can get comparable performance to previous state-of-the-art methods with just a very small number of
training examples, like dozens of training examples instead of thousands or tens of thousands, which
is pretty impressive.

</turn>


<turn speaker="Waleed Ammar" timestamp="02:22">

So that's a very general idea and it seems we can apply in many other tasks. Are there any specifics
about the language model or the way in which you use the features extract are important?

</turn>


<turn speaker="Matt Gardner" timestamp="02:37">

They, do note that this is pretty domain dependent and that they tried to apply this same method,
like the same language model to other datasets like movie reviews, I think, and this SICK semantic
relatedness task and Microsoft Paraphrase Corpus and they didn't get nearly good results. And they
say that the reason for this is that they literally just learned a language model on Amazon reviews.
And so if you get words that are out of domain that you never really saw before in the Amazon
reviews, the model just doesn't know what to do with the sentiment. And if you would learn the
language model on, in domain data for those tasks, maybe you'd have done a whole lot better.

</turn>


<turn speaker="Waleed Ammar" timestamp="03:20">

So how do they make a prediction for predicting the sentiment analysis?

</turn>


<turn speaker="Matt Gardner" timestamp="03:26">

Honestly this wasn't totally clear to me from the paper, I'm guessing. So they say they learn a
classifier on top of the hidden state of their language model. And the question is, do they take,
like which hidden state are they talking about? You're trying to classify either sentences or nodes
in a parse tree or documents. And so what exactly you predict from is debatable. And like you could
imagine if averaging the hidden states over the entire input sequence, like for all of the
characters in the sentence that you're trying to classify average hidden state or you could just
take the last one. There's one part at the end that makes me think maybe they just took the last one
because they say they do worse on classifying longer documents because it's more biased towards the
sentiment at the end of the document. And so that probably means they're taking the final hidden
states of whatever sequence they're trying to classify and then learning a simple classifier on top
of that.

</turn>


<turn speaker="Waleed Ammar" timestamp="04:26">

Yeah, the paper also have very nice figures that show that show the sentiment at different words in
the sentence. So this means they probably also, at least for qualitative evaluation, they also do
this at every position in the sentence.

</turn>


<turn speaker="Matt Gardner" timestamp="04:42">

Yeah, because they found a single unit in this hidden state that track sentiment very well you can
do some really interesting visualizations where for each character you color code it by the
sentiment that that hidden state is showing. And so one example is "Once in awhile you may get
amazed" and here it's green and then "over how bad a film can be" and it starts to go down. And "how
in the world anybody could raise money to make this kind of crap. There is absolutely no talent
included in this film" and here at this point, it's very red, very negative sentiment being
expressed as you can tell "from a crappy script to a crappy story, to crappy acting amazing..." So
the visualizations are pretty cool. You might want to take a look at that.

</turn>


<turn speaker="Waleed Ammar" timestamp="05:36">

So there are two main ideas I get from here. One we can use the language model in order to get very
good features for a downstream tasks. And the other is that he can use character level information.
So character level information is something that people have used in many previous papers but
oftentimes it's also augmented with word level information. So we have both a character level
embedding and a word embedding. I wonder if they would get competitive performance on the other
datasets if they also include the word embedding features.

</turn>


<turn speaker="Matt Gardner" timestamp="06:16">

So that you could more easily handle out of domain kinds of things. Is that what you're thinking?

</turn>


<turn speaker="Waleed Ammar" timestamp="06:20">

Right. And like if you have a training set for from the same domain then you should be able to learn
good representation for these words.

</turn>


<turn speaker="Matt Gardner" timestamp="06:28">

Yeah, I think that that even gets at a deeper third aspect of what's interesting about this work in
that how do you incorporate features learned by some external feature extractor, like a language
model into a rich model for your own task? All they did was take the hidden state and learn a simple
classifier on top of it. Your recent ACL paper. Does something a lot more interesting where you take
the features extracted from a language model and combine them inside of an LSTM or some other kind
of deeper model that you use on the downstream task. So to backup a little bit, this paper, as I
said at the beginning, fits into a line of work on unsupervised or that's kind of a loaded word, but
semi-supervised kinds of representations to extract features from natural language text. There's
this Skip Thought vectors paper from a couple of years ago.

</turn>


<turn speaker="Matt Gardner" timestamp="07:30">

That was probably one of the first to do this aside from a simple word embeddings where you take,
you try to embed larger structures and get feature extraction feature representations from larger
structures that you can use in downstream tasks. There was a paper posted on archive yesterday about
supervised learning of universal sentence representations from natural language inference data. I
haven't read it yet, but it's definitely in this line of work. But a lot of people are thinking
about how do we do representation learning on top of texts sequences and your ACL paper also fits
into this line of work. Do you want to give us a two second pitch on what this paper does?

</turn>


<turn speaker="Waleed Ammar" timestamp="08:09">

Sure. So the main idea in the ACL paper that Matt Peters, I, and Chandra and Russell wrote was to
really focusing on the first part this paper is talking about which is doing language model
transfer. So we know how to train language models on very large amounts of data. This not only gives
us good representations for individual words, but also words in context. So unlike word embeddings
that people often use, which are you have the same embedding, words have the same embedding
regardless of where they sit in the context. In a language model you can actually have an embedding
or a representation of every word within that context within a particular context. And we have
plenty of data to learn the parameters of the function that combined this representation for
different words in the context. And get a context, a sense of representation. So the idea is to use
this model, which we know how to train and also some pre-trained models already are available. We
can use it for downstream tasks in such a prediction problems. So we do this for named entity
recognition and in Chunking and it shows that we can outperform a very strong baseline and achieve a
new state-of-the-art in both data sets by adding this signal.

</turn>


<turn speaker="Matt Gardner" timestamp="09:38">

And the key difference between your work and this work, it seems to me is that you have richer
models on top of the language model input so that you can do kind of like a feature adaptation kind
of thing. The language model gives you some features and then you have an interesting complex model
that can learn how to use those features given your supervised signal.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:59">

Right. I think it is important to start with a strong model and not completely rely on the language
model to give us all the features that we need.

</turn>


<turn speaker="Matt Gardner" timestamp="10:10">

Yeah, I think that's where you run into these out of domain issues more strongly because your
language model is trained on a particular data set, on a particular objective. And so it's not
reasonable to assume that it will learn everything that it needs to for whatever task you want. But
it probably also learns good representations of language that will be useful if you can use them in
some other model.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:33">

Yeah, exactly. And especially if you're treating data doesn't act as the same domain as the test
data or what one you use the model for. I imagine the language model would be very, very useful
there.

</turn>


<turn speaker="Matt Gardner" timestamp="10:43">

Yeah. One other point about this paper their language model is not deep. It's a single layer of
multiplicative LSTM. I wondered how much better you could do if you have some kind of deep model
like I don't know, I think of ImageNet and VGG and these models that people use for image
classification and other vision tasks where you have this really deep model that you train for a
long time on some large dataset and then you can just pull that out and use it. Use various parts of
it for other downstream tasks. And we don't have that so much in language. And this language
modeling stuff is about as close as we can get it seems, except the models that we use are all
really shallow and I don't know, I wonder why, but I guess this in this paper they say that their
language model took a month to train. So I guess it's not too surprising that they didn't go deeper.

</turn>


<turn speaker="Waleed Ammar" timestamp="11:36">

Yeah, exactly. I was going to say if you have the completion and the ability to go deeper, I think
that training language pool is key in that sense.

</turn>


<turn speaker="Matt Gardner" timestamp="11:47">

Interesting. Okay. I think that's it for this paper.

</turn>


<turn speaker="Waleed Ammar" timestamp="11:51">

Right. Thanks for discussing this paper, Matt. Next time we are going to discuss a paper titled: A
Syntactic Neural Model for General-Purpose Code Generation written by Pengcheng Yin and Graham
Neubig.

</turn>
