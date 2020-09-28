---
title: "pix2code: Generating Code from a Graphical User Interface Screenshot"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: "017"
tags: []
description: "https://arxiv.org/abs/1705.07962"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F327136056&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:12">

Okay. Today's paper is called: pix2code: Generating Code from a Graphical User Interface Screenshot.
This is by Tony Beltramelli at UIzard Technologies in Denmark. The idea behind this paper is really
pretty interesting. I thought it's generating code very similar to the co-generation paper that we
talked about a few episodes ago where some folks at CMU took natural language descriptions of
software and generated the software from that description. But instead of having a natural language
description, we get an image describing the software and then we encode the image and decode
software. I think this is really cool. So the method that this paper presents is like very, very
simple and I think we could do a whole lot better than this.

</turn>


<turn speaker="Matt Gardner" timestamp="01:06">

But first, it's the problem formulation here that I think is really interesting and something that
we haven't really thought of in the NLP community but I think is really applicable and really nice.
It's, an interesting new application for semantic parsing in general. And so let me talk a little
bit about this problem specification first. So what Tony did was he first generated a very simple
domain specific language that describes user interfaces. So this has things like, I have a stack of
items and in this stack I have a row, I can have several rows of actual user interface components.
So maybe there's a label and a switch followed by a label and a button followed by a label on a
slider. Just you can imagine building user interface components using this domain specific language.

</turn>


<turn speaker="Matt Gardner" timestamp="02:05">

It's not at the level of code, but it's pretty similar to code and given a reasonable compiler, you
could compile it directly to code in a specific framework. This is how things like PhoneGap and
other kinds of things that compile Java scripts to native UI elements. Like you can do this, you've
given some high level description of a user interface. You can compile it to native code on any
particular platform that you want. And so he came up with this domain specific language for defining
very simple user interfaces. It doesn't get very complicated, just labels and switches and buttons
and sliders and groupings into horizontal or vertical kinds of stacks. And then he also had a
compiler that would take this and generate code in three specific platforms for iOS, for Android and
for the web.

</turn>


<turn speaker="Matt Gardner" timestamp="03:03">

And then given the domain specific language, you can automatically generate a whole bunch of
different configurations from valid UI descriptions in this interface language. And then given the
compiler, you can take the generated DSL code, compile it into an iOS Gooey, take a screenshot of
it, and then use that as a training example where you have the screenshot and the DSL code. And this
is, so the screenshot is your input and the DSL code is your output. And he generated 1500 training
examples for all three frameworks for iOS, for Android and for HTML and 250 test examples, trained a
model on the 1500, tested it on the 250 pretty small dataset, but he was able to get really good
performance on this.

</turn>


<turn speaker="Waleed Ammar" timestamp="04:03">

So this is potentially a revolutionary step in graphic design and software design. When you are
building user interfaces, it really consumes a lot of time to write code for it. And if you can just
give give your model an image what's your presents, what you want to do and be able to convert it to
code, that would be great. One thing I'm worried about is how hard would it be for a designer to
actually construct these images in the same way that they're using the training data? Because if you
don't, you don't tend to be the same thing.

</turn>


<turn speaker="Matt Gardner" timestamp="04:42">

Yeah, I'm not sure I would go so far as to say revolutionary. Like Apple's X code already lets you
build the user interface in a largely graphical kind of way. So like you can just drag and drop UI
components onto your onto your app and that's kind of the process you would have to do to build a
mock of this app any way to get the image. And so I'm not sure it saves you a whole lot. I think
it's more interesting just from a modeling perspective like this is, this is an interesting problem.
How, how far can we push this at getting semantic parsers to operate on image input instead of on
text input. I just think that's a really interesting idea. And to have the designer actually produce
something that's in the same style as this training set also, as you said, might be a little bit
problematic.

</turn>


<turn speaker="Matt Gardner" timestamp="05:29">

You'd have to like take a known Gooey from an app for example, like a screenshot of an app and like
cut and paste things and modify it. So, yeah, there are definitely still some open questions here on
like how generalizable is this to, a variety of different user interface things. But yeah, I think
the main idea still stands. This is a really interesting application problem I think. So let's talk
about the model. The model here is about as simple a model as you can think about. If you're
familiar with any kind of like sequences2sequence, text generation or like image captioning kinds of
stuff. This is like vanilla models for these kinds of tasks. They have a convolutional neural
network that's based on VGG to encode the Gooey into a vector of features.

</turn>


<turn speaker="Matt Gardner" timestamp="06:22">

And then they use an LSTM, a two layer LSTM to encode the DSL, like I'm generating it just a
sequence of tokens in this DSL, including all of the syntax, the opening and closing brackets and
everything is just generated n a sequence2sequence language modeling kind of approach. Where I guess
I'm saying sequence2sequence because that's what I'm familiar with. But this isn't a
sequence2sequence. It's a picture2sequence. There's, there's no associated text with the image.
You're just given the image and the code. And so the first thing that you do is predict the first
token, then given the correct token, you predict the next one. And he in this paper uses a window of
48 tokens. And it's just a classification decision given the history of the previous 48 tokens.

</turn>


<turn speaker="Matt Gardner" timestamp="07:19">

I can just have a whole bunch of training examples that say, given the state, what am I gonna
predict next? Which token comes next? One interesting point that he made is that he's not trying to
output label text. He's assuming just that this is a label and you don't need to do any kind of OCR
on the label itself. And so the output space is actually quite small. It's just the valid reserved
words in this domain specific language. And so he uses just a one-hot encoding of this, doesn't try
to do any kind of fancy word embeddings on the input level. And so it's actually a really pretty
simple kind of problem which you can see by looking at his accuracy. He gets like 98% area under the
curve in some of these best settings and like 98, 99, he does it, it works really, really well.
Which probably means that it's a very easy data, right? As you were suggesting.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:19">

Yeah. I wonder how do we synchronize the input though, because in sequence2sequence model, there's a
natural way to synchronize consuming the input. It's not clear to me how does this model work.

</turn>


<turn speaker="Matt Gardner" timestamp="08:34">

Yeah. He doesn't consume the image at all. So it's just at every step you get the same vector, the
same image features out. And so it's entirely up to the LSTM to keep track of what it's done, what
it still has to output. You can imagine doing a whole lot better modeling than this. Right. And I
think, when I saw the abstract of this, I was imagining some really cool visualizations of like the
attention at any particular decoding step to see like, what it's looking at when it's, when it's
doing this. Like he doesn't do any, any of this modeling at all. So there's a whole lot of
interesting work that can be done pushing this. I'm really excited, reading this paper made me want
to work on this problem that it seems really cool. You'd have to think a lot about like getting
better data, more varied data so that it's not such an easy task. But I think it's a really cool
idea.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:23">

Yeah. And also we're finding a real problem worry, this kind of decoding would actually help because
like you suggested, if the developer can draw the components visually, then there's no need for
doing this.

</turn>


<turn speaker="Matt Gardner" timestamp="09:41">

Yeah. So the paper we looked at a few episodes ago in the decoder decode into an abstract syntax
tree instead of to just a plain sequence of tokens. And we know that this works a whole lot better
because you're not, the modeling capacity that the model has can be focused on what actually like
the semantics of what you're generating instead of trying to learn the syntax of this DSL. And so,
yeah, there's a lot that can be done both on like how you're handling the image, attention over the
image, how you're actually doing decoding. If you want to do some interesting work it should be
pretty easy to beat this baseline.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:19">

Right. But there's not much room left actually to improve.

</turn>


<turn speaker="Matt Gardner" timestamp="10:22">

Right, right. Okay. So I think it'd be also interesting to talk about some related stuff like as I
said, this was pretty new I haven't seen anything quite like this. And there are a few things that
are at least a little bit close. The closest things I can think of are Jacob Andres' neural module
networks. So there, this is trying to operate on the visual question answering dataset VQA where
you're given an image in a question. And then what Jacob's neural module networks do is they do a
semantic parse essentially of the question into some structured representation that then gets
executed on the image. So you can think of this as semantic parsing to a learned execution model
that operates over attentions on the image. And it's kind of close except you're still, you have
text and the semantic parse is of the text and not of the image itself. For more like structured
extraction from images, there's this imSitu dataset by Mark Yatskar at the University of Washington
and AI2 where they, instead of doing image classification for classifying which objects are in the
image or object detection, like saying which images where in an image, which object is where in an
image, they extract frames from an image.

</turn>


<turn speaker="Matt Gardner" timestamp="11:46">

So you might have an attacking frame where I just opened the imSitu.org website and the first image
that appeared to me was of an elephant attacking a hippo looks like. And so what gets labeled here
is there's an attacking frame that has four slots, agent, victim, weapon place and the agent is
elephant. The elephant is doing the attacking, the victim is the hippo, the weapon is the elephant's
trunk and the places outside. And this is getting pretty close to this semantic parsing kind of
thing. You're like, you're taking an image and getting structured output, but it's not as
compositional as you would find in like UI generation or co-generation kinds of stuff. So the, we
have things that are getting kind of close, but I still think this is like a really interesting idea
and that's it. Oh, I don't know if I mentioned this was a NIPS submission to NIPS 2017 and as I
said, really, really interesting problem to me, a really simple model should be pretty easy to
extend this idea to more interesting datasets. And I'm really excited to see what comes next out of
this. I think it's, it'll be a nice line of work.

</turn>


<turn speaker="Waleed Ammar" timestamp="12:56">

Thank you for presenting this paper Matt. Next time, we'll talk about a paper titled: Generalizing
to Unseen Entities and Entity Pairs with Row-less Universal Schema.

</turn>
