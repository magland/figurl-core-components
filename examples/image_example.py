import figurl as fig


def main():
    d = {
        'type': 'Image',
        'url': 'https://hips.hearstapps.com/hmg-prod/images/little-cute-maltipoo-puppy-royalty-free-image-1652926025.jpg'
    }
    F = fig.Figure(
        view_url='http://localhost:3000',
        data=d
    )
    url = F.url(label='test image')
    print(url)
    

if __name__ == '__main__':
    main()