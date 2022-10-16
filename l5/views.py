from django.shortcuts import render
from rest_framework import viewsets, serializers, status
from .models import Range, Models, Stock
from .serializers import RangeSerializer, ModelsSerializer, StockSerializer

def index(request):
    return render(request, 'index.html')


class RangeViewSet(viewsets.ModelViewSet):
    queryset = Range.objects.all().order_by('rangename')
    serializer_class = RangeSerializer

class ModelsViewSet(viewsets.ModelViewSet):

    queryset = Models.objects.all().order_by('idrange', 'modelname')
    serializer_class = ModelsSerializer

class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all().order_by('idmodel')
    serializer_class = StockSerializer

class ModelsOfTypeViewSet(viewsets.ModelViewSet):
    serializer_class = ModelsSerializer

    def get_queryset(self):
        queryset = Models.objects.filter(idrange=self.kwargs['range_pk'])
        return queryset


class StockOfModelViewSet(viewsets.ModelViewSet):
    serializer_class = StockSerializer
    def get_queryset(self):
        queryset = Stock.objects.filter(idmodel=self.kwargs['models_pk'], amount__gt=0)
        return queryset

# class BuyViewSet(viewsets.ModelViewSet):
#     serializer_class = StockSerializer
#     def get_queryset(self):
#         item = Stock.objects.get(idmodel=self.kwargs['models_pk'], size=self.kwargs['buy_pk'])
#         item.amount = item.amount - 1
#         item.save()
#         queryset = Stock.objects.filter(idmodel=self.kwargs['models_pk'])
#         return queryset