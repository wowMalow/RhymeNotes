from django.contrib import admin

from django import forms
from .models import Note


class NoteAdminForm(forms.ModelForm):

    class Meta:
        model = Note
        fields = '__all__'


class NoteAdmin(admin.ModelAdmin):
    form = NoteAdminForm
    list_display = ('id', 'body', 'rythm', 'created_at', 'updated_at')
    list_display_links = ('id', 'body')
    search_fields = ('body', 'created_at',)
    # list_editable = ('is_published')
    list_filter = ('updated_at',)

    # save_on_top = True


admin.site.register(Note, NoteAdmin)
admin.site.site_title = 'УПРАВЛЕНИЕ РЭП ЗАПИСКАМИ'
admin.site.site_header = 'УПРАВЛЕНИЕ РЭП ЗАПИСКАМИ'