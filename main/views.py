from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse

from .forms import CreateUserForm, LoginForm

# Authentication models and functions
from django.contrib.auth.models import auth
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from .models import Post

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


def login_view(request):
    if request.user.is_authenticated:  # Check if the user is already authenticated
        return redirect('homepage')  # Redirect logged-in users to the homepage

    form = LoginForm()
    
    if request.method == "POST":
        form = LoginForm(data=request.POST)

        if form.is_valid():
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password")

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect("homepage")

    context = {"loginform": form}

    return render(request, "login.html", context=context)



@login_required(login_url="login")
def homepage(request):
    current_user = request.user
    return render(request, "homepage.html", {"current_user": current_user})

@login_required(login_url="login")
def user_logout(request):
    auth.logout(request)
    return redirect("")

@login_required(login_url="login")
def posts(request):
    
    posts = Post.objects.filter(user=request.user)


    context = {'posts': posts}

   
    return render(request, "posts.html", context=context)


@login_required(login_url="login")
def delete_post(request):
    post_id = request.POST.get('post_id')
    post = get_object_or_404(Post, id=post_id)
    
    # Check if the post belongs to the logged-in user
    if post.user == request.user:
        post.delete()
        return JsonResponse({'message': 'Post deleted successfully'}, status=200)
    else:
        return JsonResponse({'error': 'You are not authorized to delete this post'}, status=403)


def save_post(request):
    if request.method == 'POST':
        subject = request.POST.get('subject')
        short_description = request.POST.get('short_description')
        dropzone_file = request.FILES.get('dropzone_file')

        # Create and save the post
        post = Post(user=request.user, subject=subject, short_description=short_description, dropzone_file=dropzone_file)
        post.save()

        return JsonResponse({'message': 'Post saved successfully!'})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)




@login_required(login_url="login")


@login_required(login_url="login")
def classes(request):
    return render(request, "classes.html")



@login_required(login_url="login")
def chatroom(request):
    return render(request, "chatroom.html")


@login_required(login_url="login")

def quiz(request):
    return render(request, "quiz.html")
