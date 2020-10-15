---
layout: post
comments: true
title:  "Machine learning for fraud detection: 5 limitations and 5 mitigating strategies"
excerpt: "Fraudsters adapt to new models that we deploy to block their activity. This undermines multiple assumptions of classic machine learning problems. In this post, I discuss these issues and some approaches that help."
date:   2020-10-15 00:00:00
mathjax: true
---

Fraud detection may seem like just another problem we can address by throwing machine learning at it. However, in my first year on the risk data science team at Cash App, I’ve grown to appreciate unique considerations needed given our adversarial dynamic with fraudsters. Fraudsters evolve their strategies in response to our deployed fraud detection rules and models, and this response critically undermines a few core assumptions to training machine learning models. Not even deep learning is immune to downfalls such as the training data being non-representative of production data.

My motivation for writing this comes from what I feel was missing from currently available blogs. Before starting at Cash App, I was super excited to “fight fraud” and read as many articles as I could about data science for fraud detection. But I didn’t feel like I learned anything, as they mostly repeated the same points:

- General advice on ML applications and classification as an improvement to static rules ([1](https://medium.com/@Nethone_/a-beginners-guide-to-machine-learning-in-payment-fraud-detection-prevention-360c95a9ca54), [2](https://www.altexsoft.com/whitepapers/fraud-detection-how-machine-learning-systems-help-reveal-scams-in-fintech-healthcare-and-ecommerce/), [3 - even an entire class](https://www.datacamp.com/courses/fraud-detection-in-python), [4](https://marutitech.com/machine-learning-fraud-detection/))
- Imbalanced data and sampling strategies ([1](https://towardsdatascience.com/detecting-financial-fraud-using-machine-learning-three-ways-of-winning-the-war-against-imbalanced-a03f8815cce9), [2](https://towardsdatascience.com/fraud-detection-the-problem-solutions-and-tools-dd8977b435c9), [3](https://blog.codecentric.de/en/2017/09/data-science-fraud-detection/))<sup>1</sup>

## Fraudsters evolve to bypass machine learning models

A fraudster’s behavior depends on the models that are currently deployed to block fraud. When a new model is deployed and starts blocking a fraudster, they will modify their strategies in order to make successful transactions. This deteriorates the algorithm’s effectiveness, as it cannot anticipate these strategical shifts based on its limited training data.

Stakeholders often ask how accurate a model is, and mainly care to know its performance at a high level. However, the below nuances are often glossed over, but are important details for effectively tackling fraud.

### 1. Fraud in the training set is not representative of fraud later in production

When a new model is deployed, fraudsters adapt their strategies in a way to change the feature distributions that the model was trained to associate with fraud. For example, take a simplistic case where fraudsters sign up for accounts using a specific email domain. The model will therefore weight the email domain feature heavily towards its final score. When the model is deployed and the fraudsters start getting blocked, they try different strategies, including different email addresses. When they do this, the model scores for their transactions decrease, and they continue defrauding using their new strategy.

&nbsp;
&nbsp;
<div class="imgcap" style="text-align:center">
<img src="/assets/fraud/1_adapt_features.png" height="400">
<div class="thecap" style="text-align:center"><b>Figure 1.</b> Fraud patterns will evolve to circumvent deployed models.</div>
</div>
&nbsp;
&nbsp;

### 2. Test set performance metrics are invalid

Consider an example test set in which our new model flags 100 transactions. 90 were fraud (90% precision), and it missed 30 fraudulent transactions (75% recall). However, if this model was blocking at the time of these transactions, then fraudsters would have started to shift their strategy after being blocked. Say after 20 blocks, they have designed a new strategy that is consistently not detected by the model. In that scenario, we can expect to have only 67% precision (20 / 30 payments flagged were fraud) and 17% recall (20 / 120 fraud attempts were blocked).

Note here that the temporal rate of false positives can be expected to be a fairly reliable metric, as non-fraudulent activity is not expected to change in response to the model’s deployment. Therefore, the tradeoff of a model could be considered as the expected number of false positives versus the hypothesized decrease in fraud.

&nbsp;
&nbsp;
<div class="imgcap" style="text-align:center">
<img src="/assets/fraud/2_adapt_performance.png" height="400">
<div class="thecap" style="text-align:center"><b>Figure 2.</b> Validation metrics will differ substantially for examples pre- vs. post- deployment due to fraudster adaptation to deployed models.</div>
</div>
&nbsp;
&nbsp;

### 3. Models over-fit to large-scale fraud patterns

Fraudsters exploit vulnerabilities in the systems they attack. Once a vulnerability is found, they scale up their operations in order to maximize the value they can extract before a solution is deployed. This spike in fraud may be in a training set for a future fraud detection model. However, if a particular vulnerability was exploited disproportionately compared to other fraud vectors in a training set, then it will contribute a disproportionate number of samples. Accordingly, the model will likely weight this fraud pattern as more important than others, which may not be ideal.

&nbsp;
&nbsp;
<div class="imgcap" style="text-align:center">
<img src="/assets/fraud/3_pattern_training.png" height="400">
<div class="thecap" style="text-align:center"><b>Figure 3.</b> Specific fraud patterns can comprise a significant fraction of our training set. However, it will likely not be ideal for our model to over-fit to individual patterns, as future patterns will likely differ in key ways. It may be better for a model to focus more on fraudulent examples that were not part of a single large-scale pattern.</div>
</div>
&nbsp;
&nbsp;

### 4. Models can highly weight gameable features

Ideally, it’s difficult if fraudsters’ new strategies continue to yield high model scores. However, this will not be the case if the model heavily weights features the fraudster can easily change. For example, consider a simplistic case in which fraud in our training set predominantly was perpetrated using accounts that are <1 day old and transactions >$1,000. The model now considers these features highly suspicious. However, the fraudsters can trivially adapt their strategy to age their accounts until they are 2 weeks old and to make several payments of around $200 each. Because these accounts and transactions are now significantly different from past fraud, they may not be flagged by the model.

### 5. The ultimate goal is not to block fraud, but that there will be no fraud to block

In most classification problems, the goal is to identify new targets accurately. While that remains true in fraud detection, we do not want the fraudsters to continue trying to defraud. Instead, it’s better if the fraudsters give up, and so our model will no longer evaluate their activity.

Fraud is nonstationary: it comes and goes. Therefore, if we are evaluating the precision-recall tradeoff to determine a model’s threshold using an evaluation set that has a relatively low level of fraud, then trying to balance precision and recall may lead us to mistakenly set the threshold too high. This can leave us vulnerable to attack when fraud scales back up.

&nbsp;
&nbsp;
<div class="imgcap" style="text-align:center">
<img src="/assets/fraud/4_giveup_metrics.png" height="400">
<div class="thecap" style="text-align:center"><b>Figure 4.</b> Performance metrics like precision and recall will decrease dramatically if fraudsters give up. In the left case, performance metrics seem better. However, the insults to good customers (false positives) and missed fraud (false negatives) are the same in both scenarios. Therefore, the practical effect of model deployment in both cases is the same.</div>
</div>
&nbsp;
&nbsp;

## Mitigating strategies

### 1. Real-time monitoring and anomaly detection

Fraudsters get real-time feedback to adapt their strategies when their transactions are blocked. Similarly, we can minimize loss and evolve our solutions more efficiently if we are quickly alerted to new fraud strategies. Unfortunately, for financial transactions, there is a delay of usually multiple weeks between when a fraudulent transaction is made and when the card issuer reports that it was fraud. If we wait for this traditional reporting of fraud, then we would lose a ton of money because the fraudsters have several days to scale up their operations before we begin considering actions. Therefore, we significantly benefit from early indicators of fraud. 

Early fraud indicators can be created by monitoring suspicious metrics (e.g. a spike in brand new customers who have had a payment declined by a bank). Anomaly detection is also very useful (e.g. a spike in activity coming from a particular geographical region that has never been seen before). A strong relationship with an operations team of fraud experts is invaluable in monitoring fraud, as they can investigate abnormalities and keep data scientists up to date with the key properties of recent patterns.

### 2. Utilize sticky heuristics

While machine learning is often portrayed as a better version of traditional, hand-tuned heuristics, it’s important to appreciate that both serve a purpose in the fraud ecosystem. Well-designed heuristics using minimally-gameable features can be very efficient in preventing fraud. 

### 3. Weighted training set samples inversely proportionate to their density

A way to mitigate limitation #3 above is to differentially weight examples during algorithm training. We can weight samples inversely with respect to the population’s density around that sample in feature space. Therefore, a specific fraud pattern that comprises many samples in the training set does not dominate the loss function.

### 4. Increase number of minimally-gameable features

Some features that a machine learning model may see are highly correlated with fraud can be easily changed by fraudsters. It may be beneficial to train some models specifically using features that are more difficult for fraudsters to change (e.g. network and device characteristics). Therefore, our model can be more likely to block fraudsters as they evolve their strategies.

### 5. Engineer features that identify scaling behavior

Related to the last point, dynamic features can be very useful for automatically identifying suspicious attributes. For example, say that 80% of transactions coming from “aol.com” email addresses in the past year have been fraudulent. Rather than using a feature that indicates “is customer’s email address aol.com?” in the model, it could be more beneficial to have a signal like “fraud rate for a customer's email domain.” This feature will identify not only "aol.com", but also measures the suspiciousness of other email domains that we may not think to specify manually.

###### <sup>1</sup>I personally think that it’s better to only downsample for computational reasons. Loss functions should be consciously chosen, and a threshold should be set at your desired precision/recall tradeoff.)
