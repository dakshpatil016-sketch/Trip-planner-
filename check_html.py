from pathlib import Path
from html.parser import HTMLParser

class TagChecker(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.errors = []
        self.void = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}

    def handle_starttag(self, tag, attrs):
        if tag not in self.void:
            self.stack.append((tag, self.getpos()))

    def handle_endtag(self, tag):
        if not self.stack:
            self.errors.append(f'Unexpected closing </{tag}> at {self.getpos()}')
            return
        last, pos = self.stack.pop()
        if last != tag:
            self.errors.append(f'Mismatched </{tag}> at {self.getpos()}, expected </{last}> opened at {pos}')

for path in sorted(Path('.').glob('*.html')):
    data = path.read_text(encoding='utf-8')
    parser = TagChecker()
    parser.feed(data)
    print('\n' + path.name)
    if parser.errors:
        for e in parser.errors:
            print('  ERROR:', e)
    if parser.stack:
        print('  WARNING: Unclosed tags', [t for t, _ in parser.stack])
    if not parser.errors and not parser.stack:
        print('  OK')
