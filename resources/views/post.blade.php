@extends('layouts.app')
@section('meta')
    <title>{{$post->name}}</title>
    <meta name="description" content="{{$post->short_description}}">
@endsection
@section('content')
    <post :post="{{$post}}"></post>
@endsection
