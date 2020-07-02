from django.db import models


## Following are the steps to add a new model ##
# Create your models here. (creating class here and inherit it from model.Models)
    # title
    # pub_date
    # body
    # image
# Add the Blog app to settings
# Create migration
# Migrate
# Add to the admin

class Blog(models.Model):
    title = models.CharField(max_length = 255)
    pub_date = models.DateTimeField()
    body = models.TextField()
    image = models.ImageField(upload_to = 'images/')

    def summary(self):
        return self.body[:100]

    def pub_date_pretty(self):
        return self.pub_date.strftime('%b %e %Y')   # google 'strftime' and see reference website, explore more on this. It's used to customize date.

    def __str__(self):
        return self.title
