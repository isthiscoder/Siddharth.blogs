# Section pages, split into numbered pages automatically.
#
# Any page with `section:` and `per_page:` in its front matter (writings.html,
# images.html, videos.html, updates.html) becomes page 1. As you add posts,
# /writings/page2/, /writings/page3/ … appear on their own. Nothing to copy or edit.
#
# Images are counted per photo (a post with 6 photos counts as 6);
# everything else is counted per post.
module SectionPager
  def self.count(site, section)
    posts = site.categories[section] || []
    return posts.size unless section == "images"
    posts.sum do |post|
      photos = post.data["photos"]
      if photos.is_a?(Array) && !photos.empty? then photos.size
      elsif post.data["cover"] then 1
      else 0
      end
    end
  end

  class Generator < Jekyll::Generator
    safe true
    priority :lowest

    def generate(site)
      site.pages.select { |pg| pg.data["section"] && pg.data["per_page"] }.each do |first|
        section = first.data["section"]
        per = first.data["per_page"].to_i
        next if per < 1
        total_items = SectionPager.count(site, section)
        total_pages = [(total_items + per - 1) / per, 1].max
        base = first.url

        first.data["page_num"] = 1
        first.data["total_pages"] = total_pages
        first.data["total_items"] = total_items
        first.data["base_url"] = base

        (2..total_pages).each do |n|
          pg = Jekyll::PageWithoutAFile.new(site, site.source, File.join(base, "page#{n}"), "index.html")
          pg.content = first.content
          pg.data = Jekyll::Utils.deep_merge_hashes(first.data, {
            "page_num" => n,
            "permalink" => "#{base}page#{n}/",
            "title" => first.data["title"]
          })
          site.pages << pg
        end
      end
    end
  end
end
