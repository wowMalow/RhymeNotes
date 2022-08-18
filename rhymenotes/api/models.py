from django.db import models


class Note(models.Model):
    body = models.TextField(blank=True, null=True)
    rythm = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.body[:50]
