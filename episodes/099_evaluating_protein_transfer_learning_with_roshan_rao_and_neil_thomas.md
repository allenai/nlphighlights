---
title: "Evaluating Protein Transfer Learning, with Roshan Rao and Neil Thomas"
hosts: ["Matt Gardner","Waleed Ammar","Pradeep Dasigi"]
guests: ["Neil Thomas","Roshan Roa"]
number: "099"
tags: []
description: "For this episode, we chatted with Neil Thomas and Roshan Rao about modeling protein sequences and evaluating transfer learning methods for a set of five protein modeling tasks. Learning representations using self-supervised pretaining objectives has shown promising results in transferring to downstream tasks in protein sequence modeling, just like it has in NLP. We started off by discussing the similarities and differences between language and protein sequence data, and how the contextual embedding techniques are applicable also to protein sequences. Neil and Roshan then described a set of five benchmark tasks to assess the quality of protein embeddings (TAPE), particularly in terms of how well they capture the structural, functional, and evolutionary aspects of proteins. The results from the experiments they ran with various model architectures indicated that there was not a single best performing model across all tasks, and that there is a lot of room for future work in protein sequence modeling. Neil Thomas and Roshan Rao are PhD students at UC Berkeley. Paper: https://www.biorxiv.org/content/10.1101/676825v1 Blog post: https://bair.berkeley.edu/blog/2019/11/04/proteins/"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F728713984&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
artificial intelligence.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:12">

Today we'll discuss how contextualized embeddings can help improve modeling of protein sequences.
Our guests, Roshan Rao and Neil Thomas are PhD students at UC Berkeley. They are two of the
coauthors on the NeurIPS 2019 paper titled, Evaluating Protein Transfer Learning with TAPE. Other
coauthors include Nicholas Bhattacharya and other researchers. The paper introduces a benchmark of
five modeling tasks for protein sequences and experiments with improving the neural network models
used for these tasks by language model pre-training. Could you start by telling us what protein
sequences are?

</turn>


<turn speaker="Neil Thomas" timestamp="00:46">

So a protein is a polymer that's made up of a chain of single molecules, which are called amino
acids. They're 20 or so naturally occurring amino acids and the get strung together in a linear
chain. And then then in the cell it folds into a three dimensional structure, which then goes along
and performs some sort of important biological task, like bringing oxygen to your muscles or
interpreting signals of light that are coming from the outside. So proteins in your eye would do
something like that. Proteins do everything that is important. Basically don't at me,

</turn>


<turn speaker="Waleed Ammar" timestamp="01:20">

A question I think the audience would like to know why is it important to build computational models
of protein sequences?

</turn>


<turn speaker="Roshan Roa" timestamp="01:27">

Well, so proteins have, as Neil said, proteins perform a lot of functions. And you can go out and
experimentally measure and evaluate these functions in a lab. But doing so is kind of expensive and
difficult. And there's a lot of reason to believe that the function, the structure and all of the
things that we'd like to know about our protein are encoded in its sequence. So if we could take
that sequence and just predict those qualities that we'd like to know, then that would save a lot of
expensive and time consuming effort by biologists in the lab.

</turn>


<turn speaker="Neil Thomas" timestamp="01:59">

Yeah, I just wanted to add that we're collecting sequences constantly all the time. People are just
going out scooping up dirt and putting it on a sequencer and producing tens of millions of
sequences. Some of them are redundant with ones we know already, but the gap between what's
experimentally characterized and the sequences that we know of is growing super exponentially
potentially. On the flip side, the experimental characterization that I'm talking about, the most
detailed one, maybe it would be to get a high resolution structure and to get a high resolution
structure depending on the protein can take an entire PhD and so that's one structure for one
sequence.

</turn>


<turn speaker="Roshan Roa" timestamp="02:35">

To give a super exponentially, a bit of context. I believe the size of some of these data sets is
actually growing faster than Moore's law. So that kind of says you're taking one PhD to evaluate a
single sequence and not every task is that difficult, but still it's very difficult to keep up with
that rate of growth.

</turn>


<turn speaker="Neil Thomas" timestamp="02:51">

And I think that another goal here is we're not trying to replace biologists with neural networks.
What we're trying to do is augment biology with some sort of modeling in situations where you just
can't do the experimental work or the assay is too hard or the bacteria that builds your protein
can't be cultured in these types of situations. As a biologist, you could use a model to help you.

</turn>


<turn speaker="Waleed Ammar" timestamp="03:13">

So is this currently happening? Do biologist today use competition models, or is it something that's
we hope will happen more than the future?

</turn>


<turn speaker="Neil Thomas" timestamp="03:20">

Yeah, there's a range of use of, for example, secondary structure prediction definitely uses some
neural network models. A lot of the like protein function prediction happens using hidden Markov
model based pipelines. I think that potentially some room for neural network models to come in and
help there. There is actually quite a fruitful history of collaboration between biology and
computation. Not all biologists use computational models, but there's definitely some overlap.

</turn>


<turn speaker="Roshan Roa" timestamp="03:46">

Yeah. And even some of the older representation learning work, if you look at the Doc2Vec and
Word2Vec papers, those techniques were applied to to proteins to accelerate things like protein
engineering where you actually have to develop these models in order to constrain your search space.
And so definitely there is some history of these models being, I think the more modern NLP BERT
style models are a little too new for them to have really gotten a lot of traction. And I think it's
still a little unclear as to where they're best applied and how they're best applied. But that's
kind of what our work is, trying to answer that question.

</turn>


<turn speaker="Waleed Ammar" timestamp="04:23">

I think that's a, that's a very exciting area. But before we go into the details of pre-training
contextualized embedding and semi-supervision, I would have to ask you again, what ways do you think
protein sequences are similar and different from texts? You know, the audience of this podcast are
mostly NLP practitioners and researchers. So I think it will help to kind of like have a frame of
reference with respect to the text.

</turn>


<turn speaker="Neil Thomas" timestamp="04:46">

They're totally different. I mean they are sequences. I think that's the tantalizing analogy that
everyone wants to make is biological sequences are sequences of characters and so is natural
language, but a protein is a three dimensional molecule. It has like a three dimensional structure.
It has biophysical properties that can be measured, electron density that's spread out in different
densities around a molecule. There's also this aspect of proteins have lots of randomness, so there
might be a portion of your protein that's very solid and cannot be changed, but then it might have
little pieces of spaghetti coming off of it that can just move around randomly or like that can kind
of be any sequence of characters at all. So you could imagine reading a protein sentence going along
and being like, yeah, this is a word, this is a word. And then you get a string of jibberish.

</turn>


<turn speaker="Neil Thomas" timestamp="05:34">

And I think that that introduces a tough modeling constraint. The last part is that proteins
actually evolve on the level of sequence. So a gene from generation to generation can be edited via
certain mechanisms, so insertions, deletions and mutations. And it's similar to typos I guess if you
want an analogy, but there's a fitness that is associated with the gene, so the better the protein
perform its function, the more likely to be passed from generation to generation. And so randomness
will accumulate in parts of the sequence that are less important for its function and parts of the
sequence that are more important will become highly constrained. So I think those are all pretty
different from text.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="06:14">

On there any structural constraints on what kinds of protein sequences are expected and what are
not. Is there an analogy to some sort of grammar in protein sequences?

</turn>


<turn speaker="Roshan Roa" timestamp="06:24">

Certainly there are repeated sub sequences that perform particular functions. The largest
constraint, as Neil said, is function because that is what is being selected by evolution is the
function of the protein and the function is mostly determined by structure. So structure is actually
reasonably well conserved as evolution changes. Obviously, eventually you will have structural
changes, but because structured directly determines function, you get some conservation there. You
actually though can change protein sequence at that sequence level quite a bit, or at least you can
make some relatively large changes in the sequence space without effecting the structure too much.
And so that leads to this problem where the thing that you have, the kind of invariant is the
structure and you have the sequence space, which is the, the actual input to your model that you're
going to get can map relatively large number of input sequences to the same or very similar
structure. So that can be another challenge.

</turn>


<turn speaker="Neil Thomas" timestamp="07:23">

I wanted to give an example maybe of a protein type grammar. So there's kind of a local grammar in
terms of secondary structure, I'm using the word grammar completely loosly. For example, alpha
helices are sort of coils or turns that emerge from sequences of amino acids and every four
positions, the two positions that are separated by four in the sequence are closest together. And so
their interaction has to conform to some set of constraints. Basically their interaction can't be so
repulsive that they won't form this helix for example. And then the other structural constraint is
something that we call the hydrophobic core. So in general, a protein tries to protect the amino
acids that interact poorly with water. So water is polar, hydrophilic amino acids will interact
beneficially with water and hydrophobic amino acids, which are kind of more like fatty or have like
long hydrocarbon chains for example, will interact more poorly with water. So the protein will fold
in such a way to move what are called hydrophobic water fearing amino acids to its center. So
there's actually another structural constraint there. I don't know, do you consider that a grammar?
I don't know. Sometimes I want to reflect these questions back, but

</turn>


<turn speaker="Waleed Ammar" timestamp="08:36">

I do think it imposes certain like constraints on what kind of protein sequence would survive or
would be functional, right?

</turn>


<turn speaker="Neil Thomas" timestamp="08:42">

Yeah.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:43">

So this is in spirit what a grammar does, but maybe it's not exactly the same notion of grammar that
we use in language and that's fine, I think. That's why we are seeing some positive results of
retraining with semi-supervision. So before we delve into this, I feel like there's another
fundamental difference is that there is nobody you is native in the language of protein sequences.
One really good thing about studying languages that you can ask someone who understand this language
is my model prediction correct? And in protein sequences, my understanding is even biologists are
puzzled, right? Oftentimes they don't know what the sequence is doing, like what's the function of
this protein.

</turn>


<turn speaker="Neil Thomas" timestamp="09:21">

I think there are some people who are fluent in protein structures. I've recently heard about these
protein structures savant who will look at a partial structure and be like, ah, yes, this, this is
folded with this characteristic. And you're like, Oh wow, this guy's crazy. But it's a big problem
for like generating protein sequences for example. I think there's a lot of cool work that's being
done in NLP about finding pathological examples that these natural language generation models make
either copying or like repeats or ungrammatical things. But when you generate a protein sequence, no
one has any idea. The only thing you can do is go synthesize it and see if it's pathological or not.

</turn>


<turn speaker="Roshan Roa" timestamp="09:58">

Obviously that's probably one of the most expensive evaluation methodologies that you could come up
with, but there are groups that will, when you're working on generation in particular actually take
their generated proteins, synthesize them in a lab and measure the function of interest that they
were trying to achieve. That's certainly a very interesting task. It's also obviously a very
challenging task. It also requires connections to biologists and to other people who can facilitate
the kind of wet work of doing that.

</turn>


<turn speaker="Neil Thomas" timestamp="10:29">

This gets back to your first point about like why we care about studying protein sequences at all,
which is this amount of labeled data issue is very different than NLP. If you have a natural
language data set, or at least in my experience from what I've been told, if you have a natural
language dataset, you can go to Amazon Mechanical Turk and hire some people pretty cheaply to label
your data and that was one of the first questions I like. Pieter Abbeel came and posed. It's like
let's just label more data. Like, do we have a way of labeling more data and yeah, we do, but it's a
biologist or some sort of biochemist going into the lab, synthesizing sequences, culturing some
organism to grow it, creating the protein, et cetera, et cetera. It's not something that a Turker
can do for 15 cents an hour. Right? That's just not going to happen.

</turn>


<turn speaker="Waleed Ammar" timestamp="11:16">

To be honest. Also, there are some NLP tasks which are, you cannot really outsource or crowdsource,
but we're seeing a very like, clear transition in the NLP literature towards tasks which are easier
to annotate just because the crowdsourcing is becoming much more effective in producing large
amounts of labeled data. So, okay. So now inspired by all this modeling improvements in NLP with
sub-supervision in the conceptualized embeddings. I've seen a few papers in modeling protein
sequences that try to do the same thing with caveats. Right. This paper that you're introducing in
NeurIPS is very much in the same line work. And I wanted to ask you, how do you position this paper
with respect to the previous work on this area?

</turn>


<turn speaker="Roshan Roa" timestamp="11:58">

I think all of us came into it wanting to get into protein modeling and some respect and wanting to,
you know, apply BERT or something to a proteins. And as you were doing some study and some lit
review in this field, we also came across all of these different papers that had done this work and
we found it very difficult to look at this and get any sort of consensus as to what models were
people using even very broadly, were they using convolutional models, were they using recurrent
models, were they using transformers, what datasets? How do you evaluate a representation model? I
think every single paper we looked at had their own set of tasks. And then even when they evaluated
on the same kind of fundamental task, they had different data sets, different training sets,
evaluation sets. So it became very difficult to look at one papers claim and another papers to claim
and say, how do we do science with this?

</turn>


<turn speaker="Roshan Roa" timestamp="12:50">

How do we say our goal is to kind of improve state of the art. If we can't evaluate what state of
the art is, then we can't really improve it. So that kind of became one of the driving forces behind
this paper was to say, okay, let's come up with a set of tasks that we can evaluate different models
on. These tasks should be relatively broad across all the protein biology since there are so many
different things that people want to do with proteins so they shouldn't focus on the same area and
they should also have relatively large training and evaluation sets so that you're not training on,
you know, a couple hundred training examples to try and evaluate that. We found that that creates
really noisy evaluations. As we came up with these criteria. We have three aims with this paper
which are to propose these benchmark tasks so that people can use them to evaluate on.

</turn>


<turn speaker="Roshan Roa" timestamp="13:46">

Also to introduce people outside of the field who might be working in natural language processing,
who might be working in machine learning to the field and to kind of tell them why these tasks are
interesting, why they're important. If I tell you that I've solved question answering, I think most
people who come from an ML background or an NLP background immediately see why that's a useful thing
to do. On the other hand, if I tell you that I solved secondary structure prediction for most of the
listeners this podcast, that probably means nothing. So that's one of the big goals of this paper is
to say, why is this an important task to solve and why if you devote your time, will you be doing a
good thing? And lastly, it's to look at the different models that have been proposed, whether those
are these new BERT based models, whether they're ELMo style models, even some convolutional models,
and to say, okay, if we evaluate these with the same pre-training data with the same downstream
evaluation tasks at the same number of parameters and same amount of pre-training, can we actually
see what the differences between these models are, is there a difference between them and do the
same things that work well in natural language processing? Also work well for protein biology.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="14:58">

So one of the factors you mentioned who was relatively in the existence of a relatively large data
set for the tasks that are chosen? I guess this notion of what it means for a data set to be
relatively large radius across fields. What does it mean in yours?

</turn>


<turn speaker="Roshan Roa" timestamp="15:11">

So if we looked at some of the datasets that had been evaluated against previously, I think there
were a couple with one or two hundred training examples and then a dozen testing example and that,
and you have a model that has 30 million, 40 million parameters. It's very easy to overfit to, and
we found that if you actually try to use these, a lot of it depends on kind of your downstream
training hyper parameters. And that was just not what, that's not something that's really good in an
evaluation metric. The number of examples in our tasks varies. All of them have over two or three
thousand training examples.

</turn>


<turn speaker="Neil Thomas" timestamp="15:48">

So this is for the supervised tasks.

</turn>


<turn speaker="Roshan Roa" timestamp="15:51">

I think the largest of them have something like twenty to twenty-five thousand training examples.
The smallest of them have around 3000 training examples enough that changing small aspects of the
model does not result in large changes to your performance on the downstream tasks.

</turn>


<turn speaker="Waleed Ammar" timestamp="16:11">

So that's maybe a good segue to ask you about what are the five tasks that you have in the
benchmark.

</turn>


<turn speaker="Neil Thomas" timestamp="16:16">

We categorize them into three meta categories, the structural tasks, evolutionary tasks and
engineering tasks structural tasks or maybe the ones that people are most familiar with. It's kind
of been made famous since DeepMind entered into this protein folding competition. Secondary
structure prediction is a sequence to sequence task where at each position in the protein you want
to label that position as being in a helix or in a beta sheet or this coil kind of more random
structure. And this would be useful input for people trying to build three dimensional models of
proteins. Cause if you can model the local structure, then you can put some constraints on the
global structure. There's also this contact prediction. So that's the other structural task and the
idea is once one dimensional chain folds in 3D, then different positions in that chain will be close
together. And if they're within a certain threshold, eight angstroms in this case, then they're
considered to be in contact.

</turn>


<turn speaker="Neil Thomas" timestamp="17:09">

So it's basically a binary prediction task on pairs within the sequence. And this is also really
valuable information for people trying to build three dimensional structures of the protein because
positions that are in contact greatly restrict the possible confirmations that the protein can take.
Then there's another type of task which we call an evolutionary task, which is basically looking at
sequences that are not very similar in sequence space and trying to see if they fall into the same
kind of structural category, which in this case is fold. So now this is not the position of every
single molecule. It's sort of a higher level of categorization. Does this thing take a barrel shape?
Does this thing have some trans membrane type of shape, et cetera. So kind of broader
categorizations being mapped across large portions of sequence space is what we tested in the
evolutionary task, which we called remote pomology detection. So remote refers to the sequence base
homology refers to that similar structural category.

</turn>


<turn speaker="Roshan Roa" timestamp="18:03">

Yeah. And just quickly interjecting, that kind of gets back to what I was saying earlier about how
you can modify a sequence with relatively large changes while maintaining the same structure.
Because that structure is what actually determines function. And so you can modify the sequence as
long as you're not altering that downstream structure.

</turn>


<turn speaker="Waleed Ammar" timestamp="18:25">

I'd like to clarify something. When we talk about a specific protein, the way we identify that
protein is by using the sequence. So even if there is one amino acid that's different than we would
say it's a different protein, but maybe has very similar functions.

</turn>


<turn speaker="Neil Thomas" timestamp="18:39">

Usually the way I think about proteins is each species has a orthologous gene. So you know, let's
say a sea anemone or something has a green fluorescent protein, but also some sort of potato fungus
has a green fluorescent protein. So both of those kind of perform the same function. And we can see
that they're evolutionarily related, so you have the sequence which is the specific gene and you
have the species that it comes from and then if you mutate a single position, usually we think of
that as like a variant of a wild type. Yeah, you're right. The language that we've been using the
sequence determines the identity of the protein. So a single amino acid change would be considered a
new example.

</turn>


<turn speaker="Waleed Ammar" timestamp="19:17">

And when we talk about remote homology detection, to what extent is this the same as a protein
function prediction? Because you previously mentioned that structure dictates what the function is.
So I'm wondering if there's like a one to one mapping or is it more loosely defined?

</turn>


<turn speaker="Neil Thomas" timestamp="19:32">

Yeah, I think this is a step down the path towards protein function prediction. This would be a
really good first step if you can identify the fold of a brand new protein labeling function is
actually really complicated. So this is a nice boiled down task that represents that.

</turn>


<turn speaker="Waleed Ammar" timestamp="19:46">

Another thing that is not clear to me in the remote homology problem, my understanding is that the
same protein sequence would have sub sequences or like parts of it that fold in different ways. So
maybe one protein sequence would have, I don't know, the first third of it to be labeled as, I don't
know, a certain fold and then the middle part would be folded in a different way. So this doesn't
necessarily seem to be a classification task.

</turn>


<turn speaker="Neil Thomas" timestamp="20:10">

Yeah, I think you've identified perhaps a point of confusion for a lot of people. So there are
protein sequences are usually divided into domains which are sort of structurally regular components
of the protein. So yeah, like you said, the first part of the protein might take on a certain shape
and then the second part would take on some other shape. Basically, all of these tasks operate on
protein domains. So the sequence that you're getting is known to be from a sort of single structural
category. We haven't tested on full proteins. A lot of proteins only have one domain, so this is a
perfectly reasonable test to do. But for proteins that are multi-domain, it would require further
experimentation.

</turn>


<turn speaker="Waleed Ammar" timestamp="20:47">

And how do you find the domains in a protein seems like obvious.

</turn>


<turn speaker="Neil Thomas" timestamp="20:52">

Yes, so they're existing pipelines for labeling the domain within a protein you actually image the
protein for example, you can look at the structure directly and then try to tease out which parts of
the longer protein sequence are the domain. The pre-training data site we use called Pfam protein
families, all of those protein families operate on the level of domain. So the domains are
evolutionarily related. All the sequence examples are single domains, the knowledge of which part of
the protein or which part is a single domain has been given to us.

</turn>


<turn speaker="Waleed Ammar" timestamp="21:22">

And all the tasks that you're using for the benchmark are compatible. Like the old use the Pfam as
it's like foundation or like the source for the sequences.

</turn>


<turn speaker="Roshan Roa" timestamp="21:34">

So, contact certainly doesn't. This kind of gets into a lot of details. It's actually the most
similar to what you might find if you went out into the real world or it's fairly similar because
it's taken from the CASP competition. The critical assessment of protein structure prediction. What
that task does is the proteins from that are actually newly experimentally determined for the
competition and so they are people, biologists who go out determined structures of new proteins and
explicitly hold them back in order for them to be used in the competition. So that does not, I
believe, correlate with this single domain analogy very well. One of the things that some people do
in that task is this idea of domain segmentation. So they'll go out and split the protein into its
domains and then run the task separately on each domain. And that's not something that we did. So
that's kind of a downstream task evaluation pipeline that could be improved. We felt that it was an
important task to include because it is such a well known and also it is the protein structure task,
which is a huge area of computational biology. But yeah, that that is kind of something that does
seem to help if you wanted get absolutely the best performance on that dataset is to do some sort of
domain segmentation and then run your predictor on the individual domains.

</turn>


<turn speaker="Waleed Ammar" timestamp="23:06">

Thank you. So now you described two tasks has to do with structure, prediction, one that focuses on
evolution understanding and you are going to talk about protein engineering.

</turn>


<turn speaker="Neil Thomas" timestamp="23:16">

Yes. So protein engineering has huge potential for impact. It's very difficult to engineer new
proteins. So that that's, we tried to identify two types of sequence generalization that would be
useful to protein engineers, at least in theory. So in the florescence task we use a single domain
protein GFP, which fluoresces green, green fluorescent protein is what GFP stands for. We construct
our training and test set such that we have a wild type protein, everything within four mutations of
the wild we train on and everything outside of four mutations we test on. So this tries to challenge
the model to do generalization to parts of sequence base that it's never seen before and is sort of
the most useful type of generalization to approach an engineer because exploring that space is
basically impossible. It's just too expensive. The combinatorics blow up really quickly. And then we
also have this stability task, which actually uses completely unnatural like engineered proteins,
non-natural proteins that occur. And the sequence generalization that we tested here was sort of
more like interpolation within sequence space. So if you see maybe some points surrounding a test
protein, then can you infer what the stability of the test protein would be?

</turn>


<turn speaker="Waleed Ammar" timestamp="24:28">

So that when we talk about the stability, what temperature would this protein stay folded in?

</turn>


<turn speaker="Neil Thomas" timestamp="24:34">

Yeah, so this stability data set comes from a test where the protein is exposed to a protease, which
is a another protein that will cleave proteins and cut them. So the question is how well does it
resist cleavage?

</turn>


<turn speaker="Waleed Ammar" timestamp="24:48">

Got it. So that's a specific way of breaking the fold of a protein, right? Why do we care so much
about this specific way as opposed to like eating it, right. I don't know. Again, this is probably a
very naive question.

</turn>


<turn speaker="Roshan Roa" timestamp="25:01">

I don't think it's a knife question. It's actually the protein engineering tasks are not really
designed for the function itself to be very important or necessarily important to everyone. Because
what you would actually want to do is when you're engineering your own protein, you're going to have
your own function that you're interested in. That probably maybe no one has done before or that is
something that's very different. So you won't be able to take an off the shelf model and apply it to
your own protein task. So what this is really trying to get at is in the case of fluorescence, for
example, you have this hemming distance three ball around your wild type protein. So you could go
out into the lab and say, I know that this protein that I have does pretty well at this function. So
I'm going to go out and make some mutations to it, but I'll mutate no more than three amino acids at
once. And that's still within the realm of feasible.

</turn>


<turn speaker="Neil Thomas" timestamp="25:57">

It's already hard,

</turn>


<turn speaker="Roshan Roa" timestamp="25:57">

It's already hard. That's, you know, the protein lengths, like there are 20 amino acids per position
and you, you know, raise that to the protein length powers. So that's number number of mutations,
number of possible proteins that you could have. You're doing three possible mutations. So it's
definitely a challenging task. You could take that, it's still doable. And then you could get your
model to try and extrapolate, say, okay, if I did four mutations, if I did 10 mutations, where
should I explore? Because there's no way I'm going to be able to do every single combination of 10
mutations on a protein. But if my model can tell me, Hey, the proteins over here in sequence space
seem to be doing pretty well. So maybe just restrict yourself to searching in that area, then that
can be a really useful signal and can help you iterate more quickly on your experiments and
constrain that search space so that it's actually becomes something feasible from something that's
combinatorially completely impossible.

</turn>


<turn speaker="Waleed Ammar" timestamp="26:57">

Can I clarify one more thing about the fluorescence landscape prediction task? So I hear a lot like
as I'm reading in this area of research, I hear a lot about how important fluorescence is for
biologists to actually observe a certain phenomenon of the trying to discover right or find whether
this protein is expressed or not. Is this going to be the primary function of a protein, but
something that we need in order to be able to detect it. But the protein essentially we also, we
don't really care so much in real life how close it is, but we care about its function, but it's
only a measure of whether it's existing or not.

</turn>


<turn speaker="Neil Thomas" timestamp="27:29">

There are sort of multiple components to that question. The first one is you're absolutely right.
That fluorescence is really important for experimentalists. Fluorescent tags are, for example, how
we can track protein movement throughout the cell. Let's say I applied some drug to my cell and I
tagged some protein of interest, then I could see if that drug affected the production of that
protein. The localization within the cell, fluorescent tags are also important for imaging.
Fluorescents of proteins is an important function that people do care about. Green isn't the only
one, for example, like creating a better red fluorescent protein could help people a lot. The other
part of your question was sort of do we care about the brightness versus whether it fluoresces or
not at all?

</turn>


<turn speaker="Waleed Ammar" timestamp="28:07">

Well, I guess that was not very clear. Sorry. I guess my question is if we know that this protein is
pretty visible when you're doing experimentation, why do we need to create variations of it?

</turn>


<turn speaker="Roshan Roa" timestamp="28:17">

So for example, in this experiment they were trying to maximize our essence, but this is more of a
proof of concept of the idea of what protein engineering could achieve because florescence is a very
easily measurable value. So you can go out and run your methodology and run your task on it and
measure it that quantity and that gives you like a really clear, really straightforward way of
measuring a quantity of interest. Now if you're kind of a drug development lab, you probably want to
measure a very different quantity of interest.

</turn>


<turn speaker="Neil Thomas" timestamp="28:51">

Antibody binding for example.

</turn>


<turn speaker="Roshan Roa" timestamp="28:53">

Ya so, binding affinity or stability is a plausibly a very important quantity of interest to
measure. But again, you're doing this yourself. What you want to do is take a model and train it on
the data that you generate yourself because you're going to be probably working with new proteins,
probably working with a new kind of setup.

</turn>


<turn speaker="Roshan Roa" timestamp="29:14">

Maybe you're working with a new function of interest. Maybe it will be working with new technology
or a new kind of solvent or substrate or new new cells and that's not going to generalize
necessarily from an off the shelf model that was trained on a different task. But if our models do
well on fluorescence and stability, that suggests that they're able to really quickly learn and
really quickly interpolate in this sequence space. And you would be able to then go out, train your
own models and use them for the tasks that you're interested in

</turn>


<turn speaker="Waleed Ammar" timestamp="29:51">

Right, thank you for clarifying this. That was not clear to me at the beginning whether you're
proposing these tasks because of their diversity or because they're fundamentally important for most
biologists. So yeah. Thank you for clarifying. The next question would be what kind of
architectures, new architectures are used to pre-train the models?

</turn>


<turn speaker="Roshan Roa" timestamp="30:08">

Yeah, so we used transformer architecture that's pretty similar to BERT. We used convolutional
architecture, which is a resonant with approximately the same number of parameters. And then we used
an multi-layer LSTM based architecture, bi-directional LSTM that had a lot of similarities to the
ELMo paper. And again, we basically took the BERT based hyper-parameters and then tried to match the
number of parameters in each model so that we weren't giving one model, you know, 40 million
parameters in one model, like 4 million parameters. We've also trained some smaller versions of
these models that do only have about 10% of the number of parameters and as you would expect
correspondingly, they perform worse. But one thing we found that was really interesting is that for
the most part, the order was preserved as we trained larger and smaller models that if one model did
better than another, in the small scenario, it continued to do better than the other in the large
scale scenario.

</turn>


<turn speaker="Waleed Ammar" timestamp="31:09">

Okay. So that suggests it's reasonable to start with the smaller sizes to have a faster
experimentation cycle.

</turn>


<turn speaker="Roshan Roa" timestamp="31:15">

Yeah.

</turn>


<turn speaker="Waleed Ammar" timestamp="31:15">

Interesting. How did they do first on the free training tests? On the language modeling tasks?

</turn>


<turn speaker="Roshan Roa" timestamp="31:20">

It's kind of hard to evaluate on the language modeling tasks because again, no one is fluent in
proteins, right? So it's hard to know what, you know, if I have a perplexity of six or seven or
eight or ten, it's kind of difficult to know what's reasonable and to look at the predicted outputs
and say, is this what you would expect? Looking at some of the perplexities we see some of them have
a perplexity of around six or seven. There are 20 amino acids that are common. I think we say that
the vocab size is 25 because there are certain uncommonly occurring amino acids that are in the
dataset that involve variants on more commonly occurring amino acids. But realistically those occur
a very, very small fraction of the time. So if you look at, you know, what does the perplexity of
six or seven out of total vocab size of maybe 20 really mean, that could mean that it's really
learned a lot.

</turn>


<turn speaker="Roshan Roa" timestamp="32:16">

It could mean that it has a long way to go. I think none of the models that we trained were overfit.
I think they all have, we're still under fit to the to the pre training sets. They could have all
been trained for longer. We had to cut it off at some point due to, you know, compute restrictions
and constraints. But there's another paper out of NYU and Facebook that did train in even larger
model on even more data for longer than we did and I think they still said that their model was
under fit. So clearly there is a lot of information to learn and they can continue to be trained for
longer.

</turn>


<turn speaker="Neil Thomas" timestamp="32:53">

Something that's interesting. Also, it's not clear that there's a one-to-one mapping between
language modeling performance and downstream task performance this is a moment to reflect on what's
the role of amino acid modeling language modeling, pre-training in these protein type tasks. There's
lots of other information on the table. Things like the protein family that it comes from, maybe
taxonomy or like what species that comes from, I mean you could use other predictors, other
classification, other labels that come with your protein. We think that there's still signal in
language modeling still remaining still out there on the table, but it's not clear that just pushing
perplexity down is the goal.

</turn>


<turn speaker="Waleed Ammar" timestamp="33:30">

Right. Of course. The most appealing thing about language modeling is the labels come for free. Very
fitting to the title of your paper to be very cool to see a matrix of how each of the tasks, not
just the pre-training tasks. Also each of the five tasks help as a pre-training for the other ones.
,

</turn>


<turn speaker="Roshan Roa" timestamp="33:47">

Yeah that's actually, you know there are papers that do something similar to this and we tried to
evaluate one of them more directly and one thing you have to keep in mind is that this is also a
problem in NLP Envision, but we worked really hard to make sure that the training set and test sets
of each individual task were not overlapping because if you train on proteins that are 90% similar
to proteins in your test set, then obviously you can do really well, but on the other hand that's
not really interesting problem because then that raises the question of why are you using such a
complicated model anyway? Because if you have a 90 to 95% similarity to something that has a
measured quantity, you can probably just go and look up the answer to what you think this protein is
doing. And so if you want to do multitask training or to to do this cross task pre-training, you not
only have to make sure that each training and test set of individual tasks are siloed so that you're
not sharing information, but then you have to perform this across every single downstream task.

</turn>


<turn speaker="Roshan Roa" timestamp="34:55">

And that starts to really restrict the training set for some of these tasks. For example, some of
the proteins in the secondary structure prediction test set that are from scope. And that's a common
training set for lots of other people. So you have to make sure that you're very careful to do this.
It's something we've thought about doing in the future for maybe TAPE version two if that becomes a
thing. But we could make more effort to make sure that not only do we curate data sets that allow
you to train and evaluate within the tasks, but that also allow you to do this multitask matrix
style, pre-training and evaluation so that you're have to worry about sharing information across
tasks either.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="35:41">

That's a good point. The point you made about train/test/validation splits earlier, who was also
very important. Can you tell us a bit about how you did those split for your experiments?

</turn>


<turn speaker="Roshan Roa" timestamp="35:51">

So some of them come from existing data sets where people have made an effort to do these splits
already. So secondary structure, contact prediction and homology all come from existing data sets
where other people have gone out and done this this data set splitting themselves and, and there,
there are kind of metrics that you can use to determine similarity between two proteins. You'd set a
threshold that basically says, okay, are these proteins too similar? And if they're too similar I
wont include them. Then we also did a couple of things. So for the engineering tasks we defined kind
of our own metrics of similarity. With the goal of testing particular forms of generalization, so
for fluorescence that was this hemming distance generalization. If you train on proteins that are
only a handful of mutations away from your source and then evaluate on mutations that are farther
away from your source, that's testing a very specific form of generalization.

</turn>


<turn speaker="Roshan Roa" timestamp="36:49">

And then for stability we use a different form of generalization, which is you train on kind of a
wide variety of proteins and then you test on proteins that are nearby to those proteins and see if
you can actually infill the gaps in the space that you were trained on. They kind of test these two
very different forms of generalization and then also for evaluating one of the models that we
trained that was the Bepler et al model that one does do this supervised pre-training in the same
style that you were suggesting and they actually train on contact prediction and homology detection.
They use two different training sets to do that, but we were not able to use directly the training
sets that they use and the model that they trained because those training examples were present in
our test set. So then we went through and re curated their training set to remove examples that were
too similar to our test set and then retrained their model with that stripped down training set. And
of course that hurts the performance of the model in all likelihood because I think we had to remove
30 to 40% of the data for being too similar to the test set.

</turn>


<turn speaker="Neil Thomas" timestamp="38:01">

We are talking about holding out entire relationship. Let's say we have a common grandparent and
you've never seen your uncle and aunt's family before and you're like, is this person from a common
grandparent? And so this is the type of the type of restriction that we're using. So there's kind of
like this hierarchy on proteins that you can establish and then you can hold out entire families in
what are called super families and then see if you can determine whether they're from a common
structural ancestor.

</turn>


<turn speaker="Waleed Ammar" timestamp="38:27">

I've seen a paper with a hierarchical clustering basically on the basis of the sequences themselves
and then it cuts off basically at the higher level of the hierarchy to say these are like the super
families and any one family must belong to either train or dev or test.

</turn>


<turn speaker="Roshan Roa" timestamp="38:43">

I think that's somewhat similar. Yeah, so there are I believe three levels of similarity that we use
in the homology paper or the homology a task. The closest level is family level and then you've got
super family level and then you have fold level. If you look at the three evaluations as you assert
that there is a larger gap between your training and test set, you obviously decrease performance,
so for the task where you only hold out at a family level, which is like the most similar, you don't
allow proteins that are extremely similar to one another, but you allow like common grandparents for
example.

</turn>


<turn speaker="Neil Thomas" timestamp="39:19">

The reason that this is interesting is because proteins can take the same fold when they're sequence
similarity is very, very low, less than 15% if you used sequence based comparison methods, you would
look at these two proteins and say they're nothing alike, but if you were to look at their
structure, you'd see that they actually are derived from common structural ancestor or that they've
evolved the same structure. Maybe they're not from the same ancestor, but that they've borrowed the
same solution to this problem. This double barrel fold is one of my favorites.

</turn>


<turn speaker="Roshan Roa" timestamp="39:46">

You can definitely see that it's super important to do this because if you look at the difference in
kind of accuracy, our highest model gets something like 26% accuracy. That's on the most distant
relationship. But if you look at the closest relationship, I think all of our models get over 90%
accuracy and our best models get like 97 or 98% accuracy. So defining the distance in an evolution
space and in sequence space becomes extremely important for how well you think your model is doing.

</turn>


<turn speaker="Waleed Ammar" timestamp="40:18">

Got it, and so in the paper I'm seeing, I'm looking at table 2 the results for the homology column,
it looks like you're using the hardest split basically.

</turn>


<turn speaker="Neil Thomas" timestamp="40:26">

Yeah, cause that's the one that's most relevant. When you're looking at brand new sequences from
domains of life that you've never seen before, there's really no guarantee that you'll see a
sequence that's of high similarity. Even in like the pre-training sets that we're talking about,
even the very biggest protein sequence datasets. We're seeing brand new sequences all the time.

</turn>


<turn speaker="Waleed Ammar" timestamp="40:43">

Got it. This is super cool. Super interesting. What's the main highlight from the results?

</turn>


<turn speaker="Neil Thomas" timestamp="40:47">

You know, we really wanted to see one bold roke. Everyone wants to see this model is uniformly best
at all of the tasks. It learned the most from the pretraining setup and was able to just kill the
downstream tasks. This is not what we saw, so it seems like there's quite a lot of room left to
explore in terms of modeling choices for protein sequences. It's hard to explain without explaining
alignment in detail, but the basic principle is that you can get featurization of protein sequences
using traditional bioinformatic methods that are non neural and that rely on sort of local sequence
similarity to construct families and then from this family they get some statistics about the
distribution of amino acids in sort of each column of the alignment at each position in the sequence
and that is the like relevant featurization for a sequence and we see that this type of more
traditional featurization which has been in use for a long time and for good reason does really well
on the structural tasks.

</turn>


<turn speaker="Neil Thomas" timestamp="41:40">

There are some tasks for which it's not applicable because you can't construct alignments from
engineered proteins. Alignments are constructed on naturally occurring sequences, so we can't
evaluate that type of featurization on every task. I think that there's like some interesting
philosophical points here, which is protein language modeling. Pre-Training has to learn so much. It
has to look at all of these sequences and start to find patterns and similarities and also like
filter out all the randomness and the positions that are not conserved in the language here. Whereas
alignments give you important information in local, in sequence space. Maybe a lot of the
informative information for your protein of interest is is right nearby and you don't have to look
very far away, which may be what. I think that those are at least two high level takeaways that I
think mean that there's a ton of room to grow here, which is maybe the one high level takeaway.

</turn>


<turn speaker="Waleed Ammar" timestamp="42:30">

I can't remember. Did you augment the alignment features with the pre-trained features from the
language one link or did you replace them?

</turn>


<turn speaker="Roshan Roa" timestamp="42:37">

We replaced them. The alignment features in fact have a lot of disadvantages relative to the neural
model and that's actually one thing we wanted a really push in this paper is that even if you fine
tune the full model, if you do, all of the tricks that people have discovered to making a pre-
trained model is do as well as possible that this gap still exists. So looking at, for example, the
contact prediction or the secondary structure prediction task, we fine tune the full model for the
neural based models. And so they have more parameters, they have full information sharing and
everything along the entire pipeline and they still lose in fact for the contact prediction task,
really we didn't even use the full state of the art pipeline for using alignment futures. There's
actually a few additional steps that people use and that boosts their performance even more with
alignment based features.

</turn>


<turn speaker="Roshan Roa" timestamp="43:30">

But even with that disadvantage and even with giving the neural based methods as many advantages as
we could, there is still that gap that exists. So clearly just doing language modeling does not seem
to be pulling out as much information as the existing bioinformatics pipeline does, at least for
some of these tasks. So I think that's definitely an important thing to highlight. An important
difference from protein modeling to NLP is that there is empirical evidence that there is a lot more
signal that we could be pulling out that we aren't pulling out. So I think that's a really, really
interesting line of research.

</turn>


<turn speaker="Waleed Ammar" timestamp="44:05">

Right. Before we wrap up, is there anything else that you wanted to bring up that we didn't really
discuss?

</turn>


<turn speaker="Neil Thomas" timestamp="44:09">

I mean, I think that there's like also an optimistic point, which is that well, one, there's a lot
of room to grow, but that, that's sort of the more pessimistic pre-training helped. We show some
qualitative and some quantitative results that just looking at a lot of protein sequences can help
you on these downstream tasks. And I think that that's sort of, that's, that's what's so tantalizing
here is that it's working a little, but there's clearly a lot of room to grow and yeah, I guess the
takeaway for listeners, if you're a, you're bored of natural language and you're bored of images,
we've got a lot of proteins for you to look at.

</turn>


<turn speaker="Waleed Ammar" timestamp="44:45">

All right. Thank you very much for joining us today.

</turn>


<turn speaker="Neil Thomas" timestamp="44:48">

Thanks Waleed.

</turn>


<turn speaker="Roshan Roa" timestamp="44:48">

Thanks for having us on.

</turn>
