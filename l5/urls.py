from django.contrib import admin
from django.urls import path, include
from rest_framework_nested import routers
from . import views as shop_views


router = routers.DefaultRouter()
router.register(r'range', shop_views.RangeViewSet)
router.register(r'models', shop_views.ModelsViewSet, basename='models')
router.register(r'stock', shop_views.StockViewSet)


models_router=routers.NestedDefaultRouter(router, r'range', lookup='range')
models_router.register(r'models', shop_views.ModelsOfTypeViewSet, basename='models-of-type')

stock_router=routers.NestedDefaultRouter(models_router, r'models', lookup='models')
stock_router.register(r'stock', shop_views.StockOfModelViewSet, basename='stock-of-model')


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', views.index, name='index'),
    path('', include(router.urls)),
    # path('', include(type_router.urls)),
    path('', include(models_router.urls)),
    path('', include(stock_router.urls)),
    # path('', include(buy_router.urls)),

]

