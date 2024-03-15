from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required

from .forms import CreateUserForm, LoginForm

# Authentication models and functions
from django.contrib.auth.models import auth
from django.contrib.auth import authenticate, login, logout


# Create your views here.


def main(request):
    return render(request, "main.html")


def register(request):
    form = CreateUserForm()

    if request.method == "POST":
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Account created!")
            return redirect("login")

    context = {"registerform": form}
    return render(request, "register.html", context=context)


def login(request):
    form = LoginForm()

    if request.method == "POST":
        form = LoginForm(request, data=request.POST)

        if form.is_valid():
            username = request.POST.get("username")
            password = request.POST.get("password")

            user = authenticate(request, username=username, password=password)
            if user is not None:
                auth.login(request, user)
                return redirect("homepage")

    context = {"loginform": form}

    return render(request, "login.html", context=context)

@login_required(login_url="login")
def homepage(request):
    return render(request, "homepage.html")


def user_logout(request):
    auth.logout(request)
    return redirect("")

def posts(request):
    return render(request, "posts.html")
