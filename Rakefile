require "bundler/setup"
require "erb"
require "uglifier"
require "sproutcore"

LICENSE = File.read("generators/license.js")

module SproutCore
  module Compiler
    class Entry
      def body
        "\n(function(exports) {\n#{@raw_body}\n})({})\n"
      end
    end
  end
end

def strip_require(file)
  result = File.read(file)
  result.gsub!(%r{^\s*require\(['"]([^'"])*['"]\);?\s*$}, "")
  result
end

def strip_sc_assert(file)
  result = File.read(file)
  result.gsub!(%r{^(\s)+sc_assert\((.*)\).*$}, "")
  result
end

def uglify(file)
  uglified = Uglifier.compile(File.read(file))
  "#{LICENSE}\n#{uglified}"
end

SproutCore::Compiler.output = "tmp/static"

def compile_utils_task
  SproutCore::Compiler.intermediate = "tmp/ember-utils"
  js_tasks = SproutCore::Compiler::Preprocessors::JavaScriptTask.with_input "lib/**/*.js", "."
  SproutCore::Compiler::CombineTask.with_tasks js_tasks, "#{SproutCore::Compiler.intermediate.gsub(/tmp\//, "")}"
end

task :compile_utils_task => compile_utils_task

task :build => [:compile_utils_task]

file "dist/ember-utils.js" => :build do
  puts "Generating ember-utils.js"
  
  mkdir_p "dist"
  
  File.open("dist/ember-utils.js", "w") do |file|
    file.puts strip_require("tmp/static/ember-utils.js")
  end
end

# Minify dist/ember-utils.js to dist/ember-utils.min.js
file "dist/ember-utils.min.js" => "dist/ember-utils.js" do
  puts "Generating ember-utils.min.js"
  
  File.open("dist/ember-utils.prod.js", "w") do |file|
    file.puts strip_sc_assert("dist/ember-utils.js")
  end
  
  File.open("dist/ember-utils.min.js", "w") do |file|
    file.puts uglify("dist/ember-utils.prod.js")
  end
end

task :dist => ["dist/ember-utils.min.js"]

task :default => :dist