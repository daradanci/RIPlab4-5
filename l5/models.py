from django.db import models
from django.utils.translation import gettext_lazy as _


class Range(models.Model):
    rangeid = models.AutoField(verbose_name='rangeId', primary_key=True)
    rangename = models.CharField(verbose_name='rangeName', unique=True, max_length=30)

class Models(models.Model):
    modelid = models.AutoField(verbose_name='modelId', primary_key=True)
    idrange = models.ForeignKey(Range, models.DO_NOTHING, verbose_name='idRange', default=0)
    modelname = models.CharField(verbose_name='modelName', unique=True, max_length=30)
    producer = models.CharField(max_length=30, blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    image = models.CharField(max_length=30, blank=True, null=True)

class Stock(models.Model):
    class ItemSize(models.TextChoices):
        SMALL='S', _('Small')
        MEDIUM='M', _('Medium')
        LARGE='L', _('Large')
        EXTRALARGE='XL', _('Extra large'),
        EXTRAEXTRALARGE='XXL', _('Extra extra large')
    itemid = models.AutoField(verbose_name='itemId', primary_key=True)
    idmodel = models.ForeignKey(Models, models.DO_NOTHING, verbose_name='idModel', default=0)
    size = models.CharField(max_length=4, choices=ItemSize.choices, default=ItemSize.MEDIUM)
    amount = models.IntegerField(blank=True, null=True, default=0)
    class Meta:
        unique_together = (('idmodel', 'size'),)








