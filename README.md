# Finetune_alpaca_7b_chatbox_example
This is a raw implementation of finetuning a 7b alpaca with inference code to set it up as a RESTful api using flask and then accessing it using Node and Express


#1 
Refer to the Finetune.ipynb to see example of fine tuning llama 7b to alpaca with leaked llama weights and datasets. I have also used my finetune data in this step. Only samples are included in this implementation rather than all the actual data used to fine train the actual model. 

#2
Inference.ipynb is the code which shows how to use your own finetuned alpaca as a restful api with flask, just for demonstration purpose its served via jupyter notebook and ngrok which is not a good implementation for prod. 

#3
Basic node express ejs app, npm install and see the axios implementation on userpage.ejs.
