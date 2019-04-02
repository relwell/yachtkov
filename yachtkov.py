"""Retrieve song scores from yacht or nyacht."""

import os
import requests
import markovify
from bs4 import BeautifulSoup
from boltons.iterutils import flatten


def get_songs():
    """Run main function."""
    html = requests.get("http://www.yachtornyacht.com/").content
    soup = BeautifulSoup(html, features="lxml")
    divs = soup.find_all("div", class_="song-list-item")
    return [
        (
            float(div.find("div", class_="num").get_text()),
            div.find("div", class_="artist-links").get_text(),
            div.find("span", class_="song-title").get_text(),
        )
        for div in divs
    ]


def get_models():
    """Generate models."""
    songs = get_songs()
    song_model = markovify.Text(
        flatten([[song] * int(num) for (num, _, song) in songs if num > 50]),
        state_size=2,
    )
    # artist_model = markovify.Text(
    #     flatten([[artist] * int(num) for (num, artist, _) in songs if num > 50]),
    #     state_size=2,
    # )
    return (song_model, None)  # artist_model)


def main():
    """Perform main method."""
    song_model, _ = get_models()
    cnt = 0
    limit = int(os.getenv("LIMIT", "50"))
    existing_titles = {}
    # existing_artists = {}
    while True:
        song_result = song_model.make_sentence(tries=500, max_overlap_ratio=0.80)
        # artist_result = artist_model.make_sentence(
        #     tries=500, max_overlap_ratio=0.99, max_overlap_total=15
        # )
        if song_result:  # and artist_result:
            # track = "{} - {}".format(song_result, artist_result)
            if (
                song_result
                not in existing_titles
                # and artist_result not in existing_artists
            ):
                existing_titles[song_result] = 1  # track
                # existing_artists[artist_result] = track
                print(song_result)
                cnt += 1
                if cnt == limit:
                    return


if __name__ == "__main__":
    main()
