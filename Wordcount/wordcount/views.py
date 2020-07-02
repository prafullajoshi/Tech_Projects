
from django.http import HttpResponse
from django.shortcuts import render
import operator


def homepage(request):
    #return HttpResponse('Hello')
    # return render(request, 'home.html', {'hi' : 'This is me !'})
    return render(request, 'home.html')


def eggs(request):
    return HttpResponse('<h1>EGGS</h1>')

def count(request):
    fulltext = request.GET['fulltext']
    #print(fulltext)
    wordlist = fulltext.split()

    worddict = {}
    for word in wordlist:
        if word in worddict:
            #increase
            worddict[word] += 1
        else:
            #add to dictionary
            worddict[word] = 1

    #sorted_word=sorted(worddict.items(), key=operator.itemgetter(1), reverse=True)
    sortedwords = sorted(worddict.items(),key = operator.itemgetter(1),reverse = False)
    return render(request,'count.html',{'fulltext':fulltext, 'count':len(wordlist), 'sortedwords':sortedwords})

def about(request):
    return render(request,'about.html')
